import { _decorator, Prefab, assetManager, instantiate, director, Component, find } from "cc";
const { ccclass } = _decorator;

@ccclass("ModuleManager")
export class LoadingManager extends Component {
  private isShow: boolean = false;
  private static _instance: LoadingManager = null;

  // 私有化构造函数，防止外部通过new关键字创建实例
  private constructor() {
    super();
  }

  public static get instance() {
    if (this._instance == null) {
      this._instance = new LoadingManager();
    }
    return this._instance;
  }

  show() {
    if (this.isShow) return;
    this.isShow = true;

    assetManager.loadBundle("prefab", (err, bundle) => {
      if (err) return console.error(err);

      bundle.load(["LoadingIndicator", "Mask"], Prefab, (err, Prefab) => {
        if (err) return console.error(err);

        const [ListPrefab, MaskPrefab] = Prefab;
        let currentScene = director.getScene();

        let mask = instantiate(MaskPrefab);
        mask.parent = currentScene.children[0];

        let loading = instantiate(ListPrefab);
        loading.parent = currentScene.children[0];
      });
    });
  }

  hide() {
    let canvas = director.getScene().getChildByName("Canvas");
    let loading = canvas.getChildByName("LoadingIndicator");
    
    let mask = find("Mask", canvas);

    if (mask) {
      mask.destroy();
    }

    if (loading) {
      loading.destroy();
      this.isShow = false;
    }
  }
}

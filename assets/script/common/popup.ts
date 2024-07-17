import { _decorator, Prefab, assetManager, instantiate, tween, Vec3, find, director } from "cc";

let isOpen = false;

export const PopupManager = {
  open: () => {
    if (isOpen) return;
    isOpen = true;

    assetManager.loadBundle("prefab", (err, bundle) => {
      if (err) return console.error(err);

      bundle.load(["List", "Mask"], Prefab, (err, Prefab) => {
        if (err) return console.error(err);

        const [ListPrefab, MaskPrefab] = Prefab;

        let currentScene = director.getScene();

        let mask = instantiate(MaskPrefab);
        mask.parent = currentScene.children[0];

        let popup = instantiate(ListPrefab);
        popup.setScale(new Vec3(0.6, 0.6, 0.6));
        popup.parent = currentScene.children[0];

        tween(popup)
          .to(0.2, { scale: new Vec3(1.1, 1.1, 1.1) })
          .to(0.1, { scale: new Vec3(1.0, 1.0, 1.0) })
          .call(() => isOpen = false)
          .start();
      });
    });
  },

  close: () => {
    let canvas = find("Canvas");
    let mask = find("Mask", canvas);
    let popup = canvas.getChildByName("List");

    if (mask) {
      mask.destroy();
    }

    if (popup) {
      tween(popup)
        .to(0.3, { scale: new Vec3(0.0, 0.0, 0.0) })
        .call(() => {
          popup.destroy();
        })
        .start();
    }
  }
};

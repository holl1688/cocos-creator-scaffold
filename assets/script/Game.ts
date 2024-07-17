import { _decorator, Component, ProgressBar, director, Label, Color } from "cc";
import { I18nManager } from "./i18n";
const { ccclass, property } = _decorator;
const i18n = I18nManager.getInstance();

@ccclass("Game")
export class geme extends Component {
  @property({ type: ProgressBar })
  private progressBar = null;
  @property(Label)
  private startLabel = null;
  private progress: number = 0;

  start() {
    this.progressBar = this.node.getComponent(ProgressBar);
    i18n.loadLanguage("zh_CN", () => {
      i18n.t(this.startLabel, "enter");
    });
  }

  update(deltaTime: number) {
    if (this.progressBar) {
      this.progress += deltaTime;
      if (this.progress > 1) {
        this.progress = 0;
      }
    }
    this.progressBar.progress = this.progress;
  }

  changeScreen(event, customData) {
    director.loadScene("Hall");
  }
}

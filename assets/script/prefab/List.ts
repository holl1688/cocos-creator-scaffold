import { _decorator, Component, Label, Node } from "cc";
import { PopupManager } from "../common/popup";
import { findAllNodes } from "../utils/libs";
import { I18nManager } from "../i18n";
const { ccclass, property } = _decorator;
const i18n = I18nManager.getInstance();

@ccclass("List")
export class List extends Component {
  private closeLabel: Node = null;

  onLoad() {
    console.log("List Nodes:");
    findAllNodes(this.node).forEach((node) => {
      if (node.name === "Label") {
        this.closeLabel = node;
      }
    });
    const closeLabelComponent = this.closeLabel.getComponent(Label);
    i18n.t(closeLabelComponent, "close");
  }

  start() {}

  update(deltaTime: number) {}

  close() {
    PopupManager.close();
  }
}

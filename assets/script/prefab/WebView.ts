import { _decorator, assetManager, Component, director, instantiate, Prefab, Size, UITransform, WebView } from "cc";
import { base64EncodeUnicode } from "../utils/libs";
const { ccclass } = _decorator;

let webIsShow = false;

@ccclass("WebViewPrefab")
export class WebViewPrefab extends Component {
  start() {}

  update(deltaTime: number) {}

  /**
   * webview加载回调
   * @param event 点击事件
   * @param customData 自定义参数
   */
  webviewLoad(_event, status, _customData) {
    if (status === "loaded" && !webIsShow) {
      webIsShow = true;
      
      assetManager.loadBundle("prefab", (err, bundle) => {
        if (err) return console.error(err);
        
        bundle.load("WebView", Prefab, (err, webViewPrefab) => {
          if (err) return console.error(err);
  
          let currentScene = director.getScene();	// 当前场景
          
          // 准备 HTML 内容
          const htmlContent = `<html><head><meta charset="utf-8" /></head><body style="color:#fff"><p>Hello, 你好!</p></body></html>`;
          // 将 HTML 内容转换为 Base64 编码的 Data URL
          const base64Content = base64EncodeUnicode(htmlContent);
          const dataUrl = `data:text/html;base64,${base64Content}`;
          // 加载webview网页
          const webSub = instantiate(webViewPrefab);
          const webSubNode = webSub.children[0];
          const webSubComponent = webSubNode.getComponent(WebView);
          webSubNode.getComponent(UITransform).contentSize = new Size(100, 100);
          webSubComponent.url = dataUrl;
          
          webSub.parent = currentScene.children[0]; // 当前场景画布canvas
        })
      })
    }
  }
}

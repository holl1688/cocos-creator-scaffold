import { _decorator, Component, Node, Label, assetManager, Prefab, instantiate, WebView, Size, UITransform, director } from 'cc';
import { PopupManager } from './common/popup';
import { I18nManager } from './i18n';
import { LoadingManager } from './common/loading';
const { ccclass, property } = _decorator;
const i18n = I18nManager.getInstance();

// 场景: 大厅
@ccclass('Hall')
export class hall extends Component {
	@property(Label)
	private popupLabel = null;
	@property(Label)
	private loadingLabel = null;
	@property(Label)
	private englishLabel = null;
	@property(Label)
	private chineseLabel = null;

	// 初始化渲染
	start() {
		i18n.t(this.popupLabel, "popup");
		i18n.t(this.loadingLabel, "loading");
		i18n.t(this.englishLabel, "english");
		i18n.t(this.chineseLabel, "chinese");
	}

	update(deltaTime: number) {
		
	}

	/**
	 * 打开弹窗
	 * @param event 点击事件
	 * @param customData 自定义参数
	 */
	openPopup(_event, _customData) {
		PopupManager.open();
	}

	/**
	 * 切换语言
	 * @param event 点击事件
	 * @param customData 自定义参数
	 */
	changeLanguage(_event, customData) {
		i18n.loadLanguage(customData, () => {
			i18n.t(this.popupLabel, "popup");
			i18n.t(this.loadingLabel, "loading");
			i18n.t(this.englishLabel, "english");
			i18n.t(this.chineseLabel, "chinese");
		});
	}

	/**
	 * 显示加载
	 * @param event 点击事件
	 * @param customData 自定义参数
	 */
	openLoading(_event, _customData) {
		const loadingManager = LoadingManager.instance;
		loadingManager.show();
		setTimeout(() => {
			loadingManager.hide();
		}, 3000);
	}

	/**
	 * 显示webview
	 * @param event 点击事件
	 * @param customData 自定义参数
	 */
	openWebView(_event, _customData) {
		assetManager.loadBundle("prefab", (err, bundle) => {
      if (err) return console.error(err);
      
      bundle.load("WebView", Prefab, (err, WebViewPrefab) => {
        if (err) return console.error(err);

        let currentScene = director.getScene();	// 当前场景

				// web窗口
				const webWindow = instantiate(WebViewPrefab);
				webWindow.parent = currentScene.children[0]; // 当前场景画布canvas
      })
    })
	}
}


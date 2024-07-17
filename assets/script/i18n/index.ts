import { assetManager, JsonAsset, Label } from "cc";

export class I18nManager {
  private static instance: I18nManager;
  private languageData: any = {};

  private constructor() {}

  public static getInstance(): I18nManager {
    if (!I18nManager.instance) {
      I18nManager.instance = new I18nManager();
    }
    return I18nManager.instance;
  }

  public loadLanguage(languageCode: string, callback: () => void): void {
    assetManager.loadBundle("locales", (err, bundle) => {
      if (err) {
        console.error("Failed to load i18n bundle:", err);
        return;
      }

      bundle.load(languageCode, JsonAsset, (err, asset: JsonAsset) => {
        if (err) {
          console.error("Failed to load language file:", err);
          return;
        }

        this.languageData = asset.json;
        callback();
      });
    });
  }

  public t(label: Label, key: string): void {
    label.string = this.languageData[key] || key;
  }
}
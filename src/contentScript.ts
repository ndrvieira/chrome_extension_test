import { injectPhoneIcons } from "./services/phoneNumberInjector";
import './App.css';
import { injectCSS } from "./services/helpers";
import { AssetManifest, AssetManifestFileKeys } from "./type/AccessManifest";

console.log('Phone icon injector initialized!');

fetch(chrome.runtime.getURL('asset-manifest.json'))
  .then((response) => response.json())
  .then((data: AssetManifest) => {
    for (const key in data.files) {
      if (key === 'contentScript.css' || key.endsWith('.ttf') || key.endsWith('.woff2')) {
        injectCSS(document, data.files[key as AssetManifestFileKeys]);
      }
    }
    injectPhoneIcons();
  })
  .catch((error) => console.error('Error fetching manifest:', error));

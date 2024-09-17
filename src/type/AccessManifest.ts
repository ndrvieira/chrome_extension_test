export type AssetManifestFileKeys = "main.css"
  | "main.js"
  | "contentScript.js"
  | "contentScript.css"
  | "background.js"
  | "static/media/fa-solid-900.ttf"
  | "static/media/fa-brands-400.ttf"
  | "static/media/fa-solid-900.woff2"
  | "static/media/fa-brands-400.woff2"
  | "static/media/fa-regular-400.ttf"
  | "static/media/fa-regular-400.woff2"
  | "static/media/fa-v4compatibility.ttf"
  | "static/media/fa-v4compatibility.woff2"
  | "index.html";

export interface AssetManifest {
  files: Record<AssetManifestFileKeys, string>,
  entrypoints: string[],
}
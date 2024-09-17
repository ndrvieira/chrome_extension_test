export const injectCSS = (document: Document, cssFilePath: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL(cssFilePath);
  
  document.head.appendChild(link);
}
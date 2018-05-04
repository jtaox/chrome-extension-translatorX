chrome.runtime.onInstalled.addListener(function () {
  // 默认开启百度翻译
  chrome.storage.sync.set({
    baiduTranslate: true,
    googleTranslate: false
  });
});
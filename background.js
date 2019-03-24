const http = new Http();

chrome.runtime.onInstalled.addListener(function() {
  // 默认开启百度翻译
  chrome.storage.sync.set({
    baiduTranslate: true,
    googleTranslate: false
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const select = request.select || ""

  Promise.all([http.baiduRequest(select), http.googleRequest(select)]).then(([baidu, google]) => {
    sendResponse({baidu, google})
  })

  return true
});

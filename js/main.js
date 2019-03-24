const tip = new Tip();

const DURATION = 300;

const [mouseupListener, immediatelyStop] = debounce(async () => {
  // 获取选中文字 以及位置、宽高等信息
  let { rect, seleStr = "" } = getSelectPos();
  if (!seleStr.trim()) return tip.hide();
  const now = Date.now();
  tip.showEmptyView(rect, now);
  chrome.storage.sync.get(["baiduTranslate", "googleTranslate"], function({
    baiduTranslate,
    googleTranslate
  }) {
    
    chrome.runtime.sendMessage({ select: seleStr }, function(response) {
			const { baidu, google } = response;

      googleTranslate && tip.showFromGoogleApi({ result: google, rect, now });
      baiduTranslate && tip.showFromBaiduApi({ resList: baidu, rect, now });
    });
  });
});

// 监听鼠标抬起 显示tip
document.body.addEventListener("mouseup", mouseupListener);
document.body.addEventListener("mousedown", () => {
	immediatelyStop()
	tip.hide()
});
// 当滑动时隐藏tip
document.addEventListener("scroll", () => {
  tip.hide();
});

function getSelectPos() {
  let selection = window.getSelection();
  if (!selection.rangeCount) return {};
  let range = selection.getRangeAt(0);
  return {
    rect: range.getBoundingClientRect(),
    seleStr: range.toString()
  };
}

function debounce(fun) {
  let timer = null;
  return [function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      fun.call();
    }, DURATION);
  }, function () { clearTimeout(timer) }]
}

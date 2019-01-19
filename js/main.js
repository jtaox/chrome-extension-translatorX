const tip = new Tip();
const http = new Http();

const DURATION = 200

const timer = null
// 监听鼠标抬起 显示tip
document.body.addEventListener('mouseup', async () => {
    clearTimeout(timer)
    setTimeout(() => {
        // 获取选中文字 以及位置、宽高等信息
        let { rect, seleStr = '' } = getSelectPos();
        if (!seleStr.trim()) return tip.hide();
        const now = Date.now()
        tip.showEmptyView(rect, now)
        chrome.storage.sync.get(['baiduTranslate', 'googleTranslate'], function({ baiduTranslate, googleTranslate }) {
            googleTranslate && googleRequest(seleStr, rect, now)
            baiduTranslate && baiduRequest(seleStr, rect, now)
        });
    }, DURATION)
});
// 当滑动时隐藏tip
document.addEventListener('scroll', () => {
    tip.hide();
});

async function googleRequest(word, rect, now) {
    const googleResult = await http.fetchFromGoogle({ word })
    let result = 'google翻译异常'
    try {
        result = getWord(googleResult, 3)
    } catch(e) {}
    function getWord(arr, count) {
        count--
        if (count == 0) return arr[0]
        return getWord(arr[0], count)
    }
    tip.showFromGoogleApi({ result, rect, now })
}

async function baiduRequest(word, rect, now) {
    const baiduResult = await http.fetchFromBaidu({ q: word, _: Date.now() })
    if (baiduResult.errno > 0) return;
    let resList = baiduResult.data.result;
    if (!Array.isArray(resList)) resList = [{
        pre: "",
        cont: resList
    }]
    tip.showFromBaiduApi({
        resList, rect, now
    });
}

function getSelectPos() {
    let selection = window.getSelection();
    if (!selection.rangeCount) return {};
    let range = selection.getRangeAt(0);
    return {
        rect: range.getBoundingClientRect(),
        seleStr: range.toString()
    };
}

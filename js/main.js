const tip = new Tip();
// 监听鼠标抬起 显示tip
document.body.addEventListener('mouseup', () => {
    // 获取选中文字 以及位置、宽高等信息
    let { rect, seleStr } = getSelectPos();
    if (!seleStr) return tip.hide();
    $.get("https://sp1.baidu.com/5b11fzupBgM18t7jm9iCKT-xh_/sensearch/selecttext", {
        q: seleStr,
        _: new Date().getTime()
    }, function (result) {
        if (result.errno > 0) return;
        let resList = result.data.result;
        if (!Array.isArray(resList)) resList = [{
            pre: "",
            cont: resList
        }]
        tip.show({
            resList, rect
        });
    })

});
// 当滑动时隐藏tip
document.addEventListener('scroll', () => {
    tip.hide();
});

function getSelectPos() {
    let selection = window.getSelection();
    if (!selection.rangeCount) return;
    let range = selection.getRangeAt(0);
    return {
        rect: range.getBoundingClientRect(),
        seleStr: range.toString()
    };
}
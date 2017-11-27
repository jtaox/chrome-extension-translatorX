$(function () {
    let tipContent = null;
    let translateX = null;
    $(document.body).on("mouseup", function () {
        var select = document.getSelection();
        var selectText = select.toString();
        if (!selectText) {
            translateX && (translateX.style.display = "none");
            return;
        }
        translateX && (translateX.style.display = "block");
        markSelection(selectText);
        
        $.get("https://sp1.baidu.com/5b11fzupBgM18t7jm9iCKT-xh_/sensearch/selecttext", {
            q: selectText,
            _: new Date().getTime()
        }, function (result) {
            // 填充结果
            var res = result.data.result;
            if (!res) return;
            if (!Array.isArray(res)) {
                res = [{
                    pre: "",
                    cont: res
                }];
            }
            console.log(tipContent)
            for (var i = 0; i < res.length; i++) {
                var item = res[i];
                console.log(item)
                var p = document.createElement("p");
                p.innerHTML = item.pre + " " + item.cont;
                tipContent.appendChild(p);
            }
        });
    }).on("mousedown", function () {
        if (tipContent) tipContent.innerHTML = "";
    });
    var markSelection = (function () {
    
        var markerEl,
            markerId = "sel_" +
            new Date().getTime() + "_" +
            Math.random().toString().substr(2);
    
        var selectionEl;
    
        // 创建dom
        var container = `
            <div class="tip-container">
                <div class="tip-content">
                </div>
                <div class="tip-arrow">
                    <i></i>
                    <em></em>
                </div>
            </div>
        `;
    
        selectionEl = document.createElement("div");
        selectionEl.classList.add("translateX");
        selectionEl.innerHTML = container;
    
        return function (selectText) {
            var sel, range;
    
            sel = window.getSelection();
    
            if (sel.getRangeAt) {
                range = sel.getRangeAt(0).cloneRange();
            } else {
                // Older WebKit doesn't have getRangeAt
                range = document.createRange();
                range.setStart(sel.anchorNode, sel.anchorOffset);
                range.setEnd(sel.focusNode, sel.focusOffset);
    
                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== sel.isCollapsed) {
                    range.setStart(sel.focusNode, sel.focusOffset);
                    range.setEnd(sel.anchorNode, sel.anchorOffset);
                }
            }
    
            range.collapse(false);
    
            markerEl = document.createElement("span");
            markerEl.id = markerId;
            markerEl.appendChild(document.createTextNode(selectText));
            range.insertNode(markerEl);
            var markerElHeigth = markerEl.getBoundingClientRect().height;
            var markerElWidth = markerEl.getBoundingClientRect().width;
    
            if (markerEl) {
                // Lazily create element to be placed next to the selection
                document.body.appendChild(selectionEl);

                !tipContent && (tipContent = document.querySelector(".tip-content"));
                !translateX && (translateX = document.querySelector(".translateX"));
    
                // Find markerEl position http://www.quirksmode.org/js/findpos.html
                var obj = markerEl;
                var left = 0,
                    top = 0;
                do {
                    left += obj.offsetLeft;
                    top += obj.offsetTop;
                } while (obj = obj.offsetParent);
                // Move the button into place.
                // Substitute your jQuery stuff in here
                selectionEl.style.left = left - markerElWidth + "px";
                selectionEl.style.top = top + markerElHeigth + 8 + "px";
                markerEl.parentNode.removeChild(markerEl);
            }
        };
    })();
})

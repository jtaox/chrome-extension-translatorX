class Tip {
  constructor() {
    // 初始化tip 并追加至body
    this.tip = this.createTip();
    this.tipStyle = this.tip.style;
    this.tipContainer = this.tip.querySelector('.tip-content');
    this.loading = this.tip.querySelector('#tip-loading-container')
    window.document.body.append(this.tip);
  }

  /**
   * 百度api 显示tip
   * @param {object} param0 
   */
  showFromBaiduApi({ resList, rect, now }) {
    const eleArr = resList.map(item => {
      item.pre || (item.pre = "");
      let p = document.createElement('p');
      p.innerText = `${item.pre}  ${item.cont}`;
      return p.outerHTML;
    });
    this.opTip({ eleArr, rect, now })
  }

  /**
   * google api 显示tip
   */
  showFromGoogleApi({ result, rect, now }) {
    this.opTip({
      eleArr: [`<p class="google-result">${result}</p>`],
      rect,
      now
    })
  }

  showErrorView({msg, now}) {
    this.insertToTip([`<p>${msg}</p>`], now)
    this.loading.style.display = "none"
  }

  opTip({ eleArr, rect, now }) {
    this.loading.style.display = "none"
    this.insertToTip(eleArr, now);
    if (this.rect == rect) return
    this.moveToPos(rect);
  }

  showEmptyView(rect, now) {
    this.moveToPos(rect)
    this.insertToTip([], now)
    this.loading.style.display = "flex"
  }

  /**
   * 隐藏tip
   */
  hide() {
    if (this.tipStyle.display != 'none')
      this.tipStyle.display = 'none'; 
  }

  /**
   * 向tip填充数据
   * @param {array} eleArr 
   */
  insertToTip(eleArr, now) {
    if (this.now === now) {
      this.tipContainer.innerHTML += eleArr.join('')
    } else {
      this.now = now
      this.tipContainer.innerHTML = eleArr.join('')
    }
  }

  /**
   * 移动tip
   * @param {object} rect 
   */
  moveToPos(rect) {
    this.rect = rect
    this.modifyTipPosition(rect);
  }

  /**
   * 修改tip位置
   * @param {object} param0 
   */
  modifyTipPosition({top, left, height, width}) {
    if (!this.tipStyle.display || this.tipStyle.display == 'none') 
      this.tipStyle.display = 'block';
    this.tipStyle.top = top + height + 8 + 'px';
    this.tipStyle.left = left + 'px';
  }

  /**
   * 创建tip dom
   */
  createTip() {
    // 创建dom
    let container = `
    <div class="tip-container">
        <div class="tip-content">
        </div>
        <div class="bouncing-loader" id="tip-loading-container">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="tip-arrow">
            <i></i>
            <em></em>
        </div>
    </div>
    `;
    const dom = $(container).addClass('translateX')[0]

    dom.addEventListener('mousedown', (event) => event.stopPropagation())
    dom.addEventListener('mouseup', (event) => event.stopPropagation())

    return dom;
  }

 
}
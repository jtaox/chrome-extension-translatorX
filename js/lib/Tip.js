class Tip {
  constructor() {
    // 初始化tip 并追加至body
    this.tip = this.createTip();
    this.tipStyle = this.tip.style;
    this.tipContainer = this.tip.querySelector('.tip-content');
    window.document.body.append(this.tip);
  }
  /**
   * 显示tip
   * @param {object} param0 
   */
  show({ resList, rect }) {
    const eleArr = resList.map(item => {
      item.pre || (item.pre = "");
      let p = document.createElement('p');
      p.innerText = `${item.pre} ${item.cont}`;
      return p.outerHTML;
    });
    this.insertToTip(eleArr);
    this.moveToPos(rect);
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
  insertToTip(eleArr) {
    this.tipContainer.innerHTML = eleArr.join('')
  }
  /**
   * 移动tip
   * @param {object} rect 
   */
  moveToPos(rect) {
    this.modifyTipPosition(rect);
  }
  /**
   * 修改tip位置
   * @param {object} param0 
   */
  modifyTipPosition({top, left, height, width}) {
    if (this.tipStyle.display == 'none') 
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
        <div class="tip-arrow">
            <i></i>
            <em></em>
        </div>
    </div>
    `;
    return $(container).addClass('translateX')[0];
  }

 
}
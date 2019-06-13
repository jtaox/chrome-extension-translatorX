const baiduApi = 'https://sp1.baidu.com/5b11fzupBgM18t7jm9iCKT-xh_/sensearch/selecttext'
const googleApi = 'https://translate.google.cn/translate_a/single'

class Http {
  constructor() {
    this.chineseReg = /^[\u4e00-\u9fa5]+$/
  }
  async fetchFromBaidu(params) {
    !this.baiduApi && (this.baiduApi = baiduApi)
    !params._ && (params._ = Date.now())
    const url = this.getCompleteUrl({ baseUrl: this.baiduApi, params })
    const response = await fetch(url, {
      method: 'GET'
    })
    return await response.json()
  }

  async fetchFromGoogle({ word }) {
    if (!this.googleApi) this.googleApi = googleApi
    let [sl, tl] = ['zh-CN', 'en']
    if (!this.chineseReg.test(word.trim())) [sl, tl] = [tl, sl]
    const url = this.getCompleteUrl({ baseUrl: this.googleApi, params: {
      client: 'gtx',
      sl,
      tl,
      hl: 'zh-CN',
      dt: 'at',
      dt: 'bd',
      dt: 'ex',
      dt: 'ld',
      dt: 'md',
      dt: 'qca',
      dt: 'rw',
      dt: 'rm',
      dt: 'ss',
      dt: 't',
      ie: 'UTF-8',
      oe: 'UTF-8',
      source: 'btn',
      ssel: '3',
      tsel: '6',
      kc: '0',
      tk: '984327.619449',
      q: word,
    }})
    const response = await fetch(url, {
      method: 'GET'
    })
    return await response.json().catch(() => ({}))
  }

  getCompleteUrl({ baseUrl, params }) {
    const url = new URL(baseUrl)
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return url
  }

  async googleRequest(word) {
    const googleResult = await this.fetchFromGoogle({ word }) || []
    let result = 'google翻译结果解析错误'
    try {
      const [resultArray = []] = googleResult

      result = resultArray.reduce((pre, cur) => {
        return pre + (cur[0] || '')
      }, "")

    } catch(e) {}

    return result
}

  async baiduRequest(word, rect, now) {
    const baiduResult = await this.fetchFromBaidu({ q: word})

    // if (baiduResult.errno > 0) throw ({msg: baiduResult.error || "请求异常"})
    if (baiduResult.errno > 0) return [{pre: "", cont: baiduResult.error || "请求异常"}]

    let resList = baiduResult.data.result;
    if (!Array.isArray(resList)) resList = [{
        pre: "",
        cont: resList
    }]

    return resList
}

}




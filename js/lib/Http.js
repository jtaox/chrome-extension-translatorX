const baiduApi = 'https://sp1.baidu.com/5b11fzupBgM18t7jm9iCKT-xh_/sensearch/selecttext'
class Http {
  constructor() {
    // ...
  }
  async fetchFromBaidu(word) {
    if (!this.baiduApi) this.baiduApi = baiduApi
    const response = await fetch(this.baiduApi, {
      method: 'GET',
      body: {
        q: word,
        _: new Date().getTime()
      }
    })
    console.log(await response.json())
  }
  convertParam(param) {
    
  }
}

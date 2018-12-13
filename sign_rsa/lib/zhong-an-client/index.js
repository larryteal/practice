const RSA = require('../rsa')
const clients = require('restify-clients')
const Promise = require('bluebird')
const jsonObjectToSortString = require('../jsonObjectToSortString')

const zhonganTestUrl = `http://opengw.daily.zhongan.com/Gateway.do`
const zhonganUATUrl = `http://opengw-uat.zhongan.com/Gateway.do`
const zhonganPrdUrl = `ttp://opengw.zhongan.com/Gateway.do`

// 众安测试环境公钥
const zhonganTestPublicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIgHnOn7LLILlKETd6BFRJ0GqgS2Y3mn1wMQmyh9zEyWlz5p1zrahRahbXAfCfSqshSNfqOmAQzSHRVjCqjsAw1jyqrXaPdKBmr90DIpIxmIyKXv4GGAkPyJ/6FTFY99uhpiq0qadD/uSzQsefWo0aTvP/65zi3eof7TcZ32oWpwIDAQAB`
// 众安预发环境公钥
const zhonganUATPublicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsNVusWhi5ZezrQFBGxZQkg303fp6sVVl8pZZolfmI4gc5KL/OjthrziPZTrvF5RMuOXFpPXvwmQnR9FfdiDIt7ci5fMnG+IwtH7WtE1jYoXugsobFVI9ZD82MvgB/i6M+ZnIBerM//5nfTDiA9f0Hf2BdfYHMOp/6OFePNkb3uQIDAQAB`
// 众安生产环境公钥
const zhonganPrdPublicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFNndmLlsi8NYQpvZNK/b6kSjN99lwWnWbAHxfBcBYQHx5mZBR8XkkIajSiYo29f7zmM0eAI8OSo6FY16bSt23RzThd+MvDBQC6axDCgGag5992AVGItU8LtWPBrM6XRbtN3+rjIteKhNDOUbEvp60S9/8uoEfnqekd/nEG9I4mQIDAQAB`

module.exports = class ZhonganClient {
  constructor (env, appKey, privateKey, version = '1.0.0') {
    this._env = env
    this._appKey = appKey
    this._privateKey = privateKey
    this._version = version
    this._init()
  }
  post (options, data) {
    data = this._encryptAndSign(data)
    // console.log(options)
    console.log(data)
    return new Promise((resolve, reject) => {
      this._client.post(options, data, (err, req, res, obj) => {
        console.log(err, '众安响应数据=======', obj)
        if (err) return reject (err)
        try {
          obj = this._verifyAndDecrypt(JSON.parse(obj))
        } catch (error) {
          return reject (error)
        }
        return resolve({
          req: req,
          res: res,
          obj: obj
        })
      })
    })
  }
  _init () {
    let url = zhonganTestUrl
    let publicKey = zhonganTestPublicKey
    switch (this._env) {
      case 'iTest': // 测试
        url = zhonganTestUrl
        publicKey = zhonganTestPublicKey
        break
      case 'uat': // 预发
        url = zhonganUATUrl
        publicKey = zhonganUATPublicKey
        break
      case 'prd': // 生产
        url = zhonganPrdUrl
        publicKey = zhonganPrdPublicKey
        break
    }
    this._rsa = new RSA ({
      publicKey: publicKey,
      publicKeyFormat: `pkcs8-public-pem`,
      privateKey: this._privateKey,
      privateKeyFormat: `pkcs8-private-pem`
    })
    this._client = clients.createStringClient({
      url: url
    });
  }
  _encryptAndSign (requestData) {
    requestData.bizContent = this._rsa.encrypt(jsonObjectToSortString(requestData.bizContent), 'base64')
    requestData.sign = this._rsa.sign(jsonObjectToSortString(requestData), 'base64', 'utf8')
    return requestData
  }
  _verifyAndDecrypt (responseData) {
    let sign = responseData.sign
    delete responseData.sign
    let verifyIsOk =  this._rsa.verify(jsonObjectToSortString(responseData), sign, 'utf8', 'base64')
    if (!verifyIsOk) throw new  Error('众安签名校验失败')
    if (responseData.errorCode) throw new Error(`众安error ${responseData.errorMsg}`)
    if (!responseData.bizContent) throw new Error('众安响应参数中缺少 bizContent 字段')
    try {
      responseData.bizContent = this._rsa.decrypt(responseData.bizContent, 'utf8')
    } catch (err) {
      console.error(err)
      throw new Error('众安解密失败')
    }
    return responseData
  }
}

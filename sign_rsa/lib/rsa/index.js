const EncryptAndVerify = require('./EncryptAndVerify')
const SignAndDecrypt = require('./SignAndDecrypt')

module.exports = class RSA {
  constructor (options) {
    if (!options) throw new Error('RSA 参数 options 不能为空')
    if (!options.publicKey) throw new Error('RSA 参数 options.publicKey 公钥不能为空')
    if (!options.publicKeyFormat) throw new Error('RSA 参数 options.publicKeyFormat 公钥类型不能为空')
    if (!options.privateKey) throw new Error('RSA 参数 options.privateKey 私钥不能为空')
    if (!options.privateKeyFormat) throw new Error('RSA 参数 options.privateKeyFormat 私钥类型不能为空')
    this._options = options
    this._init()
  }
  encrypt (data, encoding= 'base64') {
    return this._encryptAndVerify.encrypt(data, encoding)
  }
  decrypt (data, encoding = 'utf8') {
    return this._signAndDecrypt.decrypt(data, encoding)
  }
  sign (data, encoding = 'base64', dataEncoding = 'utf8') {
    return this._signAndDecrypt.sign(data, encoding, dataEncoding)
  }
  verify (data, signature, dataEncoding = 'utf8', signatureEncoding = 'base64') {
    return this._encryptAndVerify.verify(data, signature, dataEncoding, signatureEncoding )
  }
  _init () {
    this._encryptAndVerify = new EncryptAndVerify(this._options.publicKey, this._options.publicKeyFormat)
    this._signAndDecrypt = new SignAndDecrypt(this._options.privateKey, this._options.privateKeyFormat)
  }
}


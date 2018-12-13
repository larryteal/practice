const NodeRSA = require('node-rsa')

module.exports = class EncryptAndVerify {
  constructor(publicKeyString, publicKeyFormat) {
    this._keyData = publicKeyString
    this._format = publicKeyFormat
    this._init()
  }
  encrypt(stringData, encoding = 'base64' ) {
    return this._key.encrypt(stringData, encoding)
  }
  verify(stringData, signature, dataEncoding = 'base64', signatureEncoding = 'base64') {
    return this._key.verify(stringData, signature, dataEncoding, signatureEncoding)
  }
  _init() {
    this._key = new NodeRSA()
    this._key.importKey(this._keyData, this._format)
    this._key.setOptions({ encryptionScheme: 'pkcs1' })
    this._key.setOptions({ signingScheme: 'pkcs1-sha1' })
  }
}
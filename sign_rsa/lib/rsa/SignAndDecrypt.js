const NodeRSA = require('node-rsa')

module.exports = class SignAndDecrypt {
  constructor(privateKeyString, privateKeyFormat) {
    this._keyData = privateKeyString
    this._format = privateKeyFormat
    this._init()
  }
  sign(stringData, encoding = 'base64', dataEncoding = 'base64' ) {
    return this._key.sign(stringData, encoding, dataEncoding)
  }
  decrypt(stringData, encoding = 'utf8') {
    return this._key.decrypt(stringData, encoding)
  }
  _init() {
    this._key = new NodeRSA()
    this._key.importKey(this._keyData, this._format)
    this._key.setOptions({ encryptionScheme: 'pkcs1' })
    this._key.setOptions({ signingScheme: 'pkcs1-sha1' })
  }
}
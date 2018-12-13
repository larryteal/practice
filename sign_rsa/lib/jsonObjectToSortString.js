const _ = require('lodash')

module.exports = function jsonObjectToSortString (obj = {}) {
  if (!_.isObject(obj)) obj = {}
  obj = _.assign({}, obj) // prototype 属性值不计算在内
  let objKeyArray = [] // obj 对象字段名数组
  for (let key in obj) {
    objKeyArray.push(key)
  }
  objKeyArray = objKeyArray.sort() // ASCII 码从小到大排序（字典序）
  let keyValueArray = [] // obj 键值对拼装的字符传数组
  objKeyArray.forEach(key => {
    keyValueArray.push(`"${key}":"${obj[key]}"`)
  })
  return `{${keyValueArray.toString()}}` // obj 对应的排序后的 JSON 字符串
}


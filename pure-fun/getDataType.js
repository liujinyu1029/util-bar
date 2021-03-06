// 元素类型判断 返回一个字符串 string
const getDataType = obj => {
  // tostring会返回对应不同的标签的构造函数
  const MAP = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return MAP[Object.prototype.toString.call(obj)]
}

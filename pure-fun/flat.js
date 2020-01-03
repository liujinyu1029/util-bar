// 对象或数组数据 多级拉平（默认只支持对象类型）
const flat = (data, isIncludeArray) => {
  const TYPEARR = isIncludeArray ? ['[object Object]', '[object Array]'] : ['[object Object]']
  const {
    toString
  } = Object.prototype
  // params:只支持 对象 or 数组
  if (!TYPEARR.includes(toString.call(data))) {
    console.error('[params error] flat方法只支持对象和数组型参数')
    return;
  }
  // main
  let global = {}
  const done = (data, keyArr) => {
    Object.keys(data).forEach(key => {
      if (TYPEARR.includes(toString.call(data[key]))) {
        done(data[key], keyArr.concat(key))
      } else {
        global[keyArr.concat(key).join('_')] = data[key]
      }
    })
  }
  done(data, [])
  return global;
}

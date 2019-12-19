// 对象、数组 拉平
const flat = data => {
  const TYPEARR = ['[object Object]','[object Array]']
  const { toString } = Object.prototype
  
  // params:只支持 对象、数组
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
        global[keyArr.concat(key).join('.')] = data[key]
      }
    })
  }
  done(data, [])
  return global;
}
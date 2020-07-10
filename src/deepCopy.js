// 深拷贝  这里 function 直接赋值
const deepCopy = data => {
  let obj, { toString } = Object.prototype
  if (toString.call(data) === "[object Array]") {
    obj = []
    data.forEach(v => obj.push(deepCopy(v)))
  } else if (toString.call(data) === "[object Object]") {
    obj = {}
    for (var key in data) {
      obj[key] = deepCopy(data[key])
    }
  } else {
    return data
  }
  return obj
}

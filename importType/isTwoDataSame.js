import { getType } from './getType'
/*
 * 主要是利用json化作对比
 * 数组会对比内容，即便顺序不同，也视为相等
 * 并不校对 regExp、Function 类型
 *
*/
export const isTwoDataSame = (obj1, obj2) => {
  // 情况一：obj1、obj2 为 数字、字符串、function、undefined、null 时
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2
  }
  // 情况二：obj1、obj2 为 对象、数组 时
  // 长度都不等，也就没必要再比了
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }
  // 长度相等，开始对比内容
  var isSame = true
  for (var key in obj1) {
    // typeof array
    if (getType(obj1[key]) === 'array') {
      if (JSON.stringify(obj1[key].sort()) !== JSON.stringify(obj2[key].sort())) {
        isSame = false
        break
      }
      // typeof object
    } else if (getType(obj1[key]) === 'object') {
      if (!isTwoDataSame(obj1[key], obj2[key])) {
        isSame = false
        break
      }
      // typeof number,string,Date,boolean
    } else {
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        isSame = false
        break
      }
    }
  }
  return isSame
}

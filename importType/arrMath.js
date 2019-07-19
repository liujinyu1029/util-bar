/* 
 * 数组的方法集，只应对数组参数，并为处理容错情况，其他数据类型的参数会报错 
 */ 

// 求和
export const sum = (arr) => {
  return arr.reduce((total,curVal)=>{
    return total + +curVal
  },0)
}
// 去重
export const uniquelize = (arr = []) => {
  return [...new Set(arr)]
}
// 并集
export const union = (a = [], b = []) => {
  return uniquelize(a.concat(b))
}
// 差集
export const diff = (a = [], b = []) => {
  return a.concat(b).filter(v => a.includes(v) ^ b.includes(v))
}
// 交集
export const intersect = (a = [], b = []) => {
  return a.filter(v => b.includes(v))
}
// 多维转一维 input:[1,[2,[[3,4],5],6]] output:[1,2,3,4,5,6]
// 思路：将数组转字符串后再以逗号分隔转为数组
export const unid = (arr=[]) => {
  return (arr + '').split(',').map(v => +v)
}

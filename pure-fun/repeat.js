// 数组内重复的字段，排序，获取最多，次多的值
// ['Tom','Lili','Jon','Tom'].repeat()
// ['Tom','Lili','Jon','Tom'].repeat(1,2)
Array.prototype.repeat = function (...indexArr) {
  let shipObj = this.reduce((pre, cur) => {
    pre[cur] ? pre[cur]++ : pre[cur] = 1;
    return pre;
  }, {})
  let valList = Object.values(shipObj).sort((m, n) => n - m);
  if (!indexArr.length) {
    indexArr = [0]
  }
  let resArr = indexArr.map(index => valList[index] || null).filter(v => v !== null)
  Object.keys(shipObj).forEach(key => {
    resArr.some((val, i) => {
      if (shipObj[key] === val) {
        resArr[i] = [key, shipObj[key]];
        return true;
      }
      return false
    })
  })
  return resArr.length > 1 ? resArr : resArr[0] || [];
}
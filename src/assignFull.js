// 基本等效Object.assign方法，不同于的是，assignFull会对参数内的对象、数组属性，进行合并，而不是Object.assign的直接覆盖
// @params (object|array,object|array...)
// @return object|array;
 const assignFull = (...objArgs)=>{
  return objArgs.reduce((pre,cur)=>{
    // part1:cur 是字符串、数字等普通数据类型
    if(!(cur instanceof Object)){
      return cur
    }
    // part2:cur 是函数类型
    if(typeof cur === 'function'){
      return cur
    }
    // part3：cur是数组
    if(cur instanceof Array){
      if(pre instanceof Array){
        return pre.concat(cur)
      }else{
        return cur
      }
    }
    // part3:cur是对象类型
    // 但pre不是对象
    if(!(pre instanceof Object) || pre instanceof Array || typeof pre === 'function'){
      return cur
    }
    // pre也是对象
    for (let key in cur) {
      if(!cur.hasOwnProperty(key)){
        continue
      }
      if(cur[key] instanceof Object){
        pre[key] = assignFull({},pre[key],cur[key])
      }else{
        pre[key] = cur[key]
      }
    }
    return pre
  },objArgs[0] instanceof Array?[]:{})
}
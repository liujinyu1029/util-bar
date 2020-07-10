// 基本等效Object.assign方法，不同于的是，assignFull会对参数内的对象、数组属性，进行合并，而不是Object.assign的直接覆盖
// @params (object|array,object|array...)
// @return object|array;
export const assignFull = (...objArgs)=>{
  return objArgs.reduce((pre,cur)=>{
    // prar1:cur不是对象类型
    if(!(cur instanceof Object)){
      return pre
    }
    // part2：cur是数组
    if(cur instanceof Array){
      if(pre instanceof Array){
        return pre.concat(cur)
      }else{
        return cur
      }
    }
    // part3:cur是对象类型
    if(pre instanceof Array){
      return cur
    }
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
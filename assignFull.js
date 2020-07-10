// 不同于Object.assign,assignFull是完全扩展，不管是对象、还是数组
// @params (object|array,object|array...)
// @return object|array;

const assignFull = (...objArgs)=>{
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
    for (key in cur) {
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

let peo = {usingComponents:{name:'2332'}}
let defaltData = {
  dependencies:[],
  usingComponents:{}
}

let cc = assignFull(peo,defaltData)
debugger 
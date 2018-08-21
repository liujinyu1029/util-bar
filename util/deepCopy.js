//深拷贝  这里 function 直接赋值
import {getType} from "./getType";

export const deepCopy = (data)=>{
  const type = getType(data);
  let obj;
  if(type === 'array'){
    obj = [];
    data.forEach(v=>obj.push(deepCopy(v)))
  } else if(type === 'object'){
    obj = {};
    for(var key in data){
      obj[key] = deepCopy(data[key]);
    }
  } else {
    return data;
  }
  return obj;
}

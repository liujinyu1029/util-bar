// JSON.stringify 会丢掉function
// stringifyObj +  parseObj，作为JSON的扩展，序列化后可以保留function
// PS：为了加强转换安全，会加一些料(SIGN)，所以 stringifyObj + parseObj 必须要配套使用
const PARSE_SIGN = '_liujinyu_';
export const stringifyObj = (obj) => {
  let newObj = Object.keys(obj).reduce((targObj, key) => {
    let val = (obj[key] instanceof Function && PARSE_SIGN + obj[key].toString().replace(/[\n\t]/g, '')) || obj[key];
    return { ...targObj, [key]: val };
  }, {});
  return JSON.stringify(newObj);
};

export const parseObj = (strObj) => {
  let obj = JSON.parse(strObj || '{}');
  let handCode = (key, funCode) => {
    try {
      let fun = Function(`return ${funCode}`)();
      if (fun instanceof Function) {
        obj[key] = fun;
      }
    } catch (e) {}
  };
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    let reg = new RegExp(PARSE_SIGN);
    if (reg.test(value)) {
      value = value.replace(PARSE_SIGN, '');
      if (!/(function)|(=>)/.test(value)) {
        handCode(key, 'function ' + value);
      } else {
        handCode(key, value);
      }
    }
  });
  return obj;
};

const parseObj_v1 = (strObj) => {
  let obj = JSON.parse(strObj || '{}');
  // 箭头函数 ()=>{}
  let funReg1 = /[\w\(\)\s]+=>.+/;
  // function fun(){} 、 fun(){}
  let funReg2 = /\(.*\)\s*\{.*\}/;
  let handCode = (key, funCode) => {
    try {
      let fun = Function(`return ${funCode}`)();
      if (fun instanceof Function) {
        obj[key] = fun;
      }
    } catch (e) {}
  };
  Object.keys(obj).forEach((key) => {
    let value = obj[key],
      patchStr = '';
    if (funReg1.test(value)) {
      handCode(key, value);
    } else if (funReg2.test(value)) {
      if (/function/.test(value)) {
        handCode(key, value);
      } else {
        handCode(key, 'function ' + value);
      }
    }
  });
  return obj;
};

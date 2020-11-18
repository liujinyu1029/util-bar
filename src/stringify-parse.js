// JSON.stringify 会丢掉function
// stringifyObj +  parseObj，作为JSON的扩展，序列化后可以保留function
// PS：为了加强转换安全，会加一些料(SIGN)，所以 stringifyObj + parseObj 必须要配套使用
const PARSE_SIGN = '_liujinyu_';
export const stringifyObj = (curObj) => {
  let _handFormat = (obj) => {
    return Object.keys(obj).reduce((targObj, key) => {
      let val = obj[key];
      if (Object.prototype.toString.call(val) === '[object Object]') {
        val = _handFormat(val);
      } else if (val instanceof Function) {
        val = PARSE_SIGN + val.toString().replace(/[\n\t]/g, '');
      }
      return { ...targObj, [key]: val };
    }, {});
  };
  return JSON.stringify(_handFormat(curObj));
};

export const parseObj = (curJson) => {
  let _transFun = (funString) => {
    try {
      let fun = Function(`return ${funString}`)();
      if (fun instanceof Function) {
        return fun;
      } else {
        return funString;
      }
    } catch (e) {
      return funString;
    }
  };
  let _parse = (obj) => {
    Object.keys(obj).forEach((key) => {
      let value = obj[key];
      if (Object.prototype.toString.call(value) === '[object Object]') {
        _parse(value);
      } else if (RegExp(PARSE_SIGN).test(value)) {
        value = value.replace(PARSE_SIGN, '');
        if (!/(function)|(=>)/.test(value)) {
          obj[key] = _transFun('function ' + value);
        } else {
          obj[key] = _transFun(value);
        }
      }
    });
  };
  let obj = JSON.parse(curJson || '{}');
  _parse(obj);
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

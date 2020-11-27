// JSON.stringify 会丢掉function
// stringifyObj +  parseObj，作为JSON的扩展，序列化后可以保留function
// PS：为了加强转换安全，会加一些料(SIGN)，所以 stringifyObj + parseObj 必须要配套使用
const PARSE_SIGN = '_liujinyu_';
export const stringifyJson = (curData) => {
  let _handFormat = (obj) => {
    let isArray = getDataType(obj) === 'array';
    return Object.keys(obj).reduce(
      (tarData, key) => {
        let val = obj[key];
        let type = getDataType(val);
        if (type === 'object' || type === 'array') {
          val = _handFormat(val);
        } else if (val instanceof Function) {
          val = PARSE_SIGN + val.toString();
        }
        return isArray ? tarData.concat(val) : { ...tarData, [key]: val };
      },
      isArray ? [] : {}
    );
  };
  return JSON.stringify(_handFormat(curData));
};

export const parseJson = (curJson) => {
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
      if (getDataType(value) === 'object' || getDataType(value) === 'array') {
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

// 元素类型判断 返回一个字符串 string
const getDataType = (obj) => {
  // tostring会返回对应不同的标签的构造函数
  const MAP = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return MAP[Object.prototype.toString.call(obj)];
};

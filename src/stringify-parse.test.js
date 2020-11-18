import { parseObj, stringifyObj } from './stringify-parse';

describe('stringifyObj序列化+parseObj反序列化 单元测试', function () {
  test('函数声明方式', () => {
    let obj = {
      data: {
        arr: [
          {
            name: 'liujinyu',
            getName: function (name) {
              // liujinyu
              return name || this.name;
            }
          }
        ],
        obj: {
          name: 'liujinyu',
          getName: function (name) {
            return name || this.name;
          }
        }
      }
    };
    let objStr = stringifyObj(obj);
    let newObj = parseObj(objStr);
    expect(newObj.data.arr[0].getName()).toEqual('liujinyu');
    expect(newObj.data.obj.getName()).toEqual('liujinyu');
  });

  test('简写法', () => {
    let obj = {
      data: {
        data: {
          name: 'liujinyu',
          getName(name) {
            return name || this.name;
          }
        }
      }
    };
    let objStr = stringifyObj(obj);
    let newObj = parseObj(objStr);
    expect(newObj.data.data.getName()).toEqual('liujinyu');
  });

  test('箭头函数', () => {
    let obj = {
      name: 'liujinyu',
      age: 30,
      getName: (name) => {
        return name;
      },
      getName1: (name, age) => {
        return name + age;
      },
      getName2: (name) => name,
      getName3: () => 'liujinyu'
    };
    let objStr = stringifyObj(obj);
    let newObj = parseObj(objStr);
    expect(newObj.getName('liujinyu')).toEqual('liujinyu');
    expect(newObj.getName1('liujinyu', 30)).toEqual('liujinyu30');
    expect(newObj.getName2('liujinyu')).toEqual('liujinyu');
    expect(newObj.getName3()).toEqual('liujinyu');
  });
});

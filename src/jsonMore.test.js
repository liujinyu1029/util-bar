import { parseJson, stringifyJson } from './jsonMore';

describe('stringifyObj序列化+parseJson反序列化 单元测试', function () {
  test('Numer、String关键字等的转换1',()=>{
    let option = {
      properties: {
        fCount: {
            type: Number,
            observer: function (newVal) {
                console.log(newVal)
            }
        },
        t1:Boolean,
        t2:String,
        t3:Object,
        t4:Function
      },
    }
    let resJson = stringifyJson(option);
    let resObj = parseJson(resJson)
    // expect(resObj.properties.fCount.type).toEqual(Number);
  })
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
    let objStr = stringifyJson(obj);
    let newObj = parseJson(objStr);
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
    let objStr = stringifyJson(obj);
    let newObj = parseJson(objStr);
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
    let objStr = stringifyJson(obj);
    let newObj = parseJson(objStr);
    expect(newObj.getName('liujinyu')).toEqual('liujinyu');
    expect(newObj.getName1('liujinyu', 30)).toEqual('liujinyu30');
    expect(newObj.getName2('liujinyu')).toEqual('liujinyu');
    expect(newObj.getName3()).toEqual('liujinyu');
  });
});

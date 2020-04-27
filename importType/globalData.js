import _event from "./event";

const validator = {
  set: function (target, prop, value) {
    target.emit(prop, value);
    return Reflect.set(...arguments);
  },
  get: function () {
    return Reflect.get(...arguments);
  },
};
const creat = (defaultData = {}) => {
  return new Proxy(
    Object.assign(Object.create(_event), defaultData),
    validator
  );
};

const globalData = {
  userInfo: creat({}),
};

// 使用demo
// const {userInfo} = globalData
// userInfo.watch('name',str=>{
// 	console.log('My name is:',str)
// })
// userInfo.name = 'liujinyu'

export default globalData;

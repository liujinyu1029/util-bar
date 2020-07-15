import { assignFull } from "./assignFull";

describe("assignFull 单元测试", function () {
  test("对于'对象/数组'类型的属性，会进行合并，而不是Object.assign式的覆盖", () => {
    const obj1 = { people: { name: "liujinyu" }, like: ["girl", "code"],hate:'hot' };
    const obj2 = { people: { age: 18 }, hate: "bug" };
    const obj3 = { people: { sex: "man" }, like: ["book"] };
    const resObj = assignFull(obj1, obj2, obj3);
    // 对于普通类型的属性，等效Object.assign，进行覆盖
    expect(resObj).toHaveProperty("hate", "bug");
    // 变量内，对象类型的属性会进行合并、拓展
    expect(resObj).toHaveProperty("people", {
      name: "liujinyu",
      age: 18,
      sex: "man",
    });
    // 合并数组属性
    expect(resObj).toHaveProperty("like", ["girl", "code", "book"]);
  });

  test("多层嵌套属性合并", () => {
    const obj1 = { people: { me: { name: "liujinyu" } } }
    const obj2 = { people: { me: { age: 18 } } };
    const resObj = assignFull(obj1, obj2);
    // 这里测试是三层嵌套 people.me.name
    expect(resObj).toHaveProperty("people.me", { name: "liujinyu", age: 18 });
  });

  test("assignFull不会改变第一个参数，不喜欢Object.assigin会脏化首参的特性", () => {
    // Object.assign会污染首位参数obj
    var obj = {name:"liujinyu"}
    Object.assign(obj,{age:18}) 
    expect(obj).not.toEqual({name:"liujinyu"})

    // assignFull避免了Object.assigin会脏化首参的特性
    var objNew = { name: "liujinyu" }
    assignFull(objNew, {age:18} )
    expect(objNew).toEqual({name:"liujinyu"})
  })

  test("assignFull返回的是新变量", () => {
    let obj = {name:"liujinyu"}
    expect(assignFull(obj)).not.toBe(obj)
  })

  test("也支持多个数组类型的变量进行合并", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5];
    const resArr = assignFull(arr1, arr2);
    expect(resArr).toEqual([1, 2, 3, 4, 5]);
  });

  test("健壮性测试：输入underfind、null、string、numbser等异常参数", () => {
    expect(
      assignFull(
        undefined,
        null,
        { people: { name: "liujinyu" } },
        undefined,
        null,
        { people: { age: 18 } },
        123,
        "xxx",
        undefined,
        null
      )
    ).toEqual({people:{ name: "liujinyu", age: 18} });
        // 数组合并 抗干扰
    const asssignArrRes = assignFull(
      [],
      undefined,
      null,
      [{ people: { name: "liujinyu" } }],
      undefined,
      null,
      [{ people: { age: 18 } }],
      123,
      "xxx",
      undefined,
      null
    )
    expect(asssignArrRes).toEqual([{ people: { name: "liujinyu" } },{ people: { age: 18 } }]);
    
  });

  test("健壮性测试：无有效输入时，返回空对象", () => {
    expect(assignFull()).toEqual({});
    expect(assignFull(undefined, null, 23, "sg")).toEqual({});
  })
});

/*
* 将传入的数字num，转换成金额单位，三位一个‘，’,并保留n位小数
* 支持四舍五入，百分数，负数，字符容错 “-12x33x4.56ss7%” => "-12,335.57%"
* num:string（必传）需要转换的数字 如：12345.678 => 12,345.67
* n:number(可不传，默认50位)小数点后保留的位数
* */
const toThousands = (num,n=99)=> {
  let numArr
  let symbol = /%/.test(num) && '%' || ''
  let sign = /^-\d+/.test(num) ? '-' : ''
  let tempArr = []
  try{
    num = +(num+'').replace(/[^\d.]*/g,'')
    let m = n>0 ? 1 : 0
    //四舍五入 begin
    let n1 = n+1
    num = (num.toString().match(new RegExp('\\d+(\\.\\d{'+m+','+n1+'})?','g'))||[''])[0]
    num = eval('Math.round(num*1e'+n+')/1e'+n)
    //四舍五入 end
    numArr = num.toString().split('.')
    let handArr = numArr[0].match(/\d/g)||['']
    handArr.reverse().forEach(function(v,i){
      if(!(i%3)&&i) {
        tempArr.push(',')
      } ;
      tempArr.push(v)
    });
  }catch(e){
    console.warn('小工具toThousands报错：' , e)
    return
  }
  return sign+tempArr.join('').split('').reverse().join('') + (numArr[1] && ('.'+numArr[1]) || '')+symbol
}
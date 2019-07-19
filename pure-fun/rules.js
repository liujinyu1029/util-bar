/*
 * 格式校验规则 : 验证通过返回 false 不通过返回错误提示string 如‘不可以为空’
 * 
 */

// 数字格式校验
const checkNumber = val => {
  if (!val) {
    return '不可以为空'
  } else if (isNaN(val)) {
    return '只能为数字'
  } else if (/^\d+(\.\d{1,2})?$/.test(val)) {
    return '不支持负数，且只能到小数点后两位'
  } else if (val > 100000) {
    return '输入超长'
  } else {
    return false
  }
}


const arrMath = require('./arrMath')

// var a = math.uniquelize([1, 2, 2, 3, 4, 32, -23, '-13', null, null], [1, 2, null])
var a = arrMath.unid([1,[2,[[3,4],5],6]])
console.log(a)
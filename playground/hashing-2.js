const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
//
var data = {
  id: 10
};
var token = jwt.sign(data, '123abc');//el segundo argumento es el secreto que valida que no se haya modificado la infromación y sea confiable es SALT
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded:', decoded);
// jwt.verify

// var message = 'I am user number 3';
//
// var hash = SHA256(message).toString();
//
// console.log(hash);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Confía en el id');
// }else{
//   console.log('no confíes es del diablo');
// }
// var message = 'number 3';
// var hash = SHA256(message).toString();
// console.log(`Message : ${message}`);
// console.log(`Hash : ${hash}`);

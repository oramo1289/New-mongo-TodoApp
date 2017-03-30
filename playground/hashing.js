const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';//primero creamos la variable
//antes de hashear el password debemos de llamar dos metódos
bcrypt.genSalt(12, (err, salt)=>{ // toma dos argumentos rounds el numero de veces que vas a usar para generar el salt el segundo es el callback function
  bcrypt.hash(password, salt, (err, hash)=>{//tres argumentos el primero es el password a hashear el segundo el el salt que se agreggo arriba y el tercaero el el callback function
    console.log(hash);
  });
});

var hashedPassword = '$2a$12$b//8MpA8o/33b.FqNVER0.drq0GNGouLhHs67qnp/9AoIfdg5zrjK';

bcrypt.compare(password, hashedPassword, (err, res)=>{
  console.log(res);
});
//
// var data = {
//   id: 10
// };
// var token = jwt.sign(data, '123abc');//el segundo argumento es el secreto que valida que no se haya modificado la infromación y sea confiable es SALT
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded:', decoded);

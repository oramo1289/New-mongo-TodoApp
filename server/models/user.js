var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      // validator: (value) => {
      //   return validator.isEmail(value);
      // },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});
UserSchema.methods.toJSON = function () {//estamos reescribiendo la funcion regular toJson para que solo me regrese
  //el id y el email no necesita lo demás
  var user = this;//this es el user en cuestón, //user en minuscula es cada documento dentro de la base de datos
  var userObject = user.toObject(); //convierte el mongoose variable(user) a un objeto

  return _.pick(userObject, ['_id', 'email']);//recoges del objeto el id y el email lo demás lo dejasa fuera
};

UserSchema.methods.generateAuthToken = function () {//las instancias de metódos se guardan en el objeto methods
  var user = this;//this es el usuario
  var access = 'auth';//auth es el string que debe de pasar en el schema
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();//es el hashing con el secreto convertido a string

  user.tokens.push({access, token});//push es una funcion para agregar uno o màs elementos al final del array

  return user.save().then(() => {
    return token;
  });//esta regresnado un value que va a representar success  cuando lo llame en server.js
};
UserSchema.statics.findByToken = function (token) { //los metodos de modelo se guardan en la objeto static
  var User = this;//User con u mayúscula es se refiere al modelo
  var decoded;//va a guardar el jwt.verify() y está indefinida porque si hay algún error necesitamos atrparlo y hacer algo con el por eso usaremos try/cath block

  try {
    decoded = jwt.verify(token, 'abc123');// si esto genera un error pasamos a catch  y lo resolvemos si todo sale bien pasamos a lo que sigue
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();// es lo mismo de arriba
  }

  //success case

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password){
  var User = this;

  return User.findOne({email}).then((user) =>{//una vez que encuentre el email va a buscar que cocuerde el password
    if(!user) {//si no hay un usuario debera regresar un promesa de rechazo
      return Promise.reject();
    }

    return new Promise(function(resolve, reject) {
      //use bcrypt to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) =>{
        if (res){//si resuelve true entonces resuelve enviando el usuario
          resolve(user);
        }else {
          reject();//rechazalo y envía un 400
        }
      });
    });
  });
};

UserSchema.pre('save', function(next){
  var user = this;

  if (user.isModified('password')) {//si fue modifiacdo entonces guarda el nuevo password si no sigue adelante
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(user.password, salt, (err, hash)=>{
        user.password = hash;//el texto plano de user.password lo igualamos al texto ya hasheado
        next();
      });
    });
  } else {
    next();
  }
});
var User = mongoose.model('User', UserSchema);

module.exports = {User};

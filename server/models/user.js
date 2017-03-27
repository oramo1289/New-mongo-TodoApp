var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


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
  var user = this;//this es el user en cuestón
  var userObject = user.toObject(); //convierte el mongoose variable(user) a un objeto

  return _.pick(userObject, ['_id', 'email']);//recoges del objeto el id y el email lo demás lo dejasa fuera
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;//this es el usuario
  var access = 'auth';//auth es el string que debe de pasar en el schema
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();//es el hashing con el secreto convertido a string

  user.tokens.push({access, token});//push es una funcion para agregar uno o màs elementos al final del array

  return user.save().then(() => {
    return token;
  });//esta regresnado un value que va a representar success  cuando lo llame en server.js
};
var User = mongoose.model('User', UserSchema);

module.exports = {User};

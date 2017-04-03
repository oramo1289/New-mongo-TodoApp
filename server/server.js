require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
// Local
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) =>{
  var todo = new Todo({
    text : req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res)=>{
  Todo.find({
    _creator : req.user._id// me va a regresar totods que solamente haya hecho el dueño del id
  }).then((todos)=>{
    res.send({todos});
  }, (err)=>{
    res.status(400).send(err);
  });
});
app.get('/todos/:id', authenticate, (req, res)=>{
//  res.send(req.params);
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }
   Todo.findOne({
     _id: id,
     _creator: req.user._id // el creador sea la misma id del usuario que hizo el request
   }).then((todo)=>{
     if (!todo) {
      return  res.status(404).send();
     }
     res.send({todo});
   }).catch((err)=>{
    res.status(400).send(err);
   });
});

app.delete('/todos/:id', authenticate, (req, res)=>{
  //get the id
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }
   Todo.findOneAndRemove({
     _id: id,
     _creator : req.user._id
   }).then((todo)=>{
     if (!todo) {
      return res.status(404).send();
     }
     res.send({todo});
   }).catch((err)=>{
    res.status(400).send(err);
   });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
    //new es por mongoose y es lo mismo que return original de mongodb
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

//POST users singup
app.post('/users', (req, res) =>{

  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();

  }).then((token) => {
    res.header('x-auth', token).send(user); //el goal es que me regrese el
    //token a travès del header x- es para custom headers,
    //header('x-header', valueHeader) toma dos valores el nombre del header y el valor del header
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user)=>{// necesito encontrar las credenciales de los usuarios que van a ingresar
//despues en el cao de exito debera regresarme el usuario
//aqui crearemos un nuevo token respondiendo a la http request
return user.generateAuthToken().then((token) => {//genera un nuevo token luego en respuesta le decimos que el header tenga el valor del nuevo token
  res.header('x-auth', token).send(user);//luego envía el usuario con el token asignado
});
  }).catch((e) => {//si hay un error lo atrapa y lo enseña
    res.status(400).send();
  });
});

//log out user

app.delete('/users/me/token', authenticate, (req, res) => { // lo que queremos es borrar el token
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});
app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};


//MKE7153
//con return es con lo que encademnamos para seguir con la promesa then()
// app.get('/users/me', (req, res) => {// es una ruta privada a la que solamente va a acceder después de que el token sea validado
//   var token = req.header('x-auth'); //req.header es casi igual a res.header()
// //la diferencia es que uno va a recivir el header que se establecio enteriormente para poder enseñar
// //la página del usuario perteneciente al header hasheado
//
//   User.findByToken(token).then((user)=>{//creamos el model method findByToken en user.js
//     if (!user) {//es un token valido pero no encontro el documento
//       //podríamos copiar el res.status(401).send(); pero una mejor forma es con return Promis.reject();
//       return Promise.reject();// de esta manera se detiene la función y se va a catch para cachar el error y resolverlo
//     }
//     res.send(user);
//   }).catch((e) => {
//     res.status(401).send();//el 401 es porque el usuario no es correcto
//   });
// });

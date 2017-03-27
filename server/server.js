require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
// Local
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/User');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (err)=>{
    res.status(400).send(err);
  });
});
app.get('/todos/:id', (req, res)=>{
//  res.send(req.params);
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }
   Todo.findById(id).then((todo)=>{
     if (!todo) {
      return  res.status(404).send();
     }
     res.send({todo});
   }).catch((err)=>{
    res.status(400).send(err);
   });
});

app.delete('/todos/:id', (req, res)=>{
  //get the id
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }
   Todo.findByIdAndRemove(id).then((todo)=>{
     if (!todo) {
      return res.status(404).send();
     }
     res.send({todo});
   }).catch((err)=>{
    res.status(400).send(err);
   });
});

app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, [`text`, 'completed']);

  if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }

   if (_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime();
   }else {
     body.completed = false;
     body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo)=>{//new es por mongoose y es lo mismo que return original de mongodb
     if(!todo){
       return res.status(404).send();
     }
     res.send({todo});
   }).catch((err)=>{
     res.status(400).send();
   });
});

//POST users
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

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};

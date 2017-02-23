const express = require('express');
const bodyParser = require('body-parser');
// Local
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
// const {User} = require('./models/User');

var app = express();
const port = process.env.PORT || 3000;

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

// var newTodo = new Todo({
//   text : 'Cook Dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Save Todo', doc);
// }, (e) => {
//   console.log('unable to save Todo');
// });
//hola

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};

const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
var userId='58a61656047bb21dd43eba9b';
// var id ='58aa0242f8607d139c5e2d2c11';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
//
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });
//
// Todo.findById(id).then((todo)=>{
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id',todo);
// }).catch((err)=> console.log(err));
User.findOne({
  _id:userId
}).then((user)=>{
  console.log('User encontrado', user);
});
User.findById(userId).then((user)=>{
  if (!user) {
    return console.log('User not found');
  }
  console.log('User by id', user);
}, (err)=>{
  console.log(err);
});

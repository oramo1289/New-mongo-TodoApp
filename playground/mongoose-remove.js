const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });
//remueve todos loas archivos que machan

// Todo.findOneAndRemove({_id:'5637yehsflhr'}).then((todo)=>{
//   console.log(todo);
// });
// Todo.findByIdAndRemove('someId').then((todo)=>{
//   console.log(todo);
// });

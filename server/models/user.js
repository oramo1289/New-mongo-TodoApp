var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email : {
    type : String,
    require : true,
    trim : true,
    minlength : 2
  }
});

module.exports = {User};



// var newTodo = new Todo({
//   text : 'Cook Dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Save Todo', doc);
// }, (e) => {
//   console.log('unable to save Todo');
// });
// 
// var newOther = new Todo({});
//
// newOther.save().then((doc) => {
//   console.log('Save the doc', doc);
// }, (e) => {
//   console.log('unable to save', e);
// });

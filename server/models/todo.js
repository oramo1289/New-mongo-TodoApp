const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text:{
    type: String,
    require: true,
    minlength: 1,
    trim: false//se deshace de los espacios en blanco
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});

module.exports={Todo};
// ============================
// var schema = mongoose.Schema;
//
// var holaSchema = new schema({
//   title:  String,
//   author: String,
//   body:   String
// });
//
// var hola = mongoose.model('Hola', holaSchema);
//
// // es lo mismo en cualquiera de los casos
// var hola = mongoose.model('Hola', {
//   title:  String,
//   author: String,
//   body:   String
// });


// var Schema = mongoose.Schema;

// var blogSchema = new Schema({
//   title:  String,
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });

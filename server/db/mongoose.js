const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
//'mongodb://localhost:27017/TodoList'

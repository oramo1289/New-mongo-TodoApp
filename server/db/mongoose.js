const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
//'mongodb://localhost:27017/TodoList'


// Mongoose is the most popular library for using Mongodb on Node.js.
// I took some time to learn about the case sentivity and model name renaming it does behind the curtain.
// Let’s assume the model I have is ‘Campaign’.
// mongodb collection name is case sensitive (‘Campaigns’ is different from ‘campaigns’)
// mongodb best practises is to have all lower case for collection name (‘campaigns’ is preferred)
// mongoose model name should be singular and upper case (‘Campaign’)
// mongoose will lowercase and pluralize with an ‘s’ so that it can access the collection (‘Campaign’ » ‘campaigns’)
// Knowing this is especially useful if you are dealing with existing collections.

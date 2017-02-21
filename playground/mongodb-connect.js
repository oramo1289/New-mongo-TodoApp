const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }

  console.log('connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text:'Do something',
  //   completed:false
  // }, (err, result)=>{
  //     if (err) {
  //       return console.log('unable to insert Todo');
  //     }
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //
  // db.collection('User').insertOne({
  //     name:'Oscar',
  //     age:27,
  //     location:'Mexico'
  // }, (err, result)=>{
  //   if (err) {
  //     return console.log('Unable to insert new user');
  //   }
  //   console.log('Succeed in your request ' + JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});//es donde se conecta

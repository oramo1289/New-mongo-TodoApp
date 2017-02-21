const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }

  console.log('connected to MongoDB server');

  db.collection('Todos').find({
    completed:false
  }).toArray().then((doc)=>{
    console.log('Todos');
    console.log(JSON.stringify(doc, undefined, 2));
  },(err)=>{
    console.log('Unable to fetch Todos');
  });

  db.close();
});//es donde se conecta

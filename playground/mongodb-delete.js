//mongo client te deja conectarte al mongo database

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('Connected to MongoDB server');

//deleteMany = borrar muchos documentos
// db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result)=>{
//   console.log(result);  ObjectId("58a4bc79586fb42924b8ec25")
// });
//deleteOne = borra solo un documento
// db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result)=>{
//   console.log(result);
// });
//findOneAndDelete= borra un archivo pero me regresa el valor del archivo borrado
// db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
//   console.log(result);
// });
// db.collection('Users').deleteMany({name:'cosa'}).then((result)=>{
//   console.log(result);
// });
// db.collection('Users').findOneAndDelete({_id :new ObjectID("58a4bc79586fb42924b8ec25")}).then((result)=>{
//   console.log(result);
// });

  //db.close();
});

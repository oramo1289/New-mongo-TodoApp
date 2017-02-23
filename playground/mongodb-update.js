const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('Connected to MongoDB server');


  //finaOneAndUpdate

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('58a4e15c0cf1ceadc4510493')
  // },{
  //   $set:{
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false //regresa el archivo updated
  // }).then((result)=>{
  //   console.log(result);
  // });
  db.collection('User').findOneAndUpdate({
    _id: new ObjectID('58acbff82f5f5424746ac574')
  },{
    $set:{
      name:'Jeannette'
    },
    $inc:{age : -2}//incrementa edad por 2
    //update operator
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  });
  db.close();
});

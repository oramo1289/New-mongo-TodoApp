// $env:NODE_ENV="development"
var env = process.env.NODE_ENV || 'development';
console.log('env ****', env);

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
//cuando usas una variable para acceder auna propiedad lo haces con [] notation

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoList';
// }else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoListTest';
// }

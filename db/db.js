// this is whee we will set up our db connection
const mongoose = require('mongoose');

//foodone (like vampirePopulate) is the name of our database
// this is auto connected so dont have to write out the number 27017
mongoose.connect('mongodb://localhost/foodone');

// console logging our messages to see what's happening
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
  console.log(err, ' Mongoose failed to connect')
});

mongoose.connection.on('disconnected', () => {
  console.log(' Mongoose is disconnected')
});

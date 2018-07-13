// crete my Schema
const mongoose = require('mongoose');

// we are creating our model for our data
const fruitSchema = new mongoose.Schema({
  name: String,
  color: String,
  readyToEat: Boolean
});

//exporting the whole fruits array and it will be named whatever we require as
// this model part is allowing us to talk to mongodb and is calling my collection
// UPDATE mongodb will name it fruits even though we called it Fruit :(
module.exports = mongoose.model('Fruit', fruitSchema);

// const fruits = [
//     {
//         name:'apple',
//         color: 'red',
//         readyToEat: true
//
//     },
//     {
//         name:'pear',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name:'banana',
//         color: 'yellow',
//         readyToEat: true
//     }
// ];

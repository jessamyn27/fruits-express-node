const express = require('express');
//init the express object
const app = express(); //app is an object

// require our model (fruit array from file fruits.js)
//model should be capitalized
// this is our view for the server
const Fruits = require('./models/fruits')

//creating the index route
// below is our index route should show all the fruits
app.get('/fruits', (req, res) => {
res.send(Fruits)
})

app.get('/fruits/:index', (req, res) => {
res.render('show.ejs', {
  fruit: Fruits[req.params.index]
})
});


app.listen(3000, () => {
  console.log('I am listening on port 3000');
});// render is when you wat to show an ejs template to the client
// res.render('show.ejs', {
// fruit: Fruits[req.params.index] // this creates a "fruit" varialbe in the show page
// })
//   // res.send(Fruits) //model should be capitalized
// });


// try to go to localhost:3000/fruits/0 and we want to see apple

// we are going to use query parameters to act like a variable which can be send over by the client
// app.get('/fruits/awesome', (req, res) => {
//   res.send('fruits are awesome')
// });

// below is our show route and it alwasy shows one item from the model
// app.get('/fruits/:index', (req, res) => {
// res.render('show.ejs', {
//   fruit: Fruits[req.params.index]
// })
// });
//
//
// app.listen(3000, () => {
//   console.log('I am listening on port 3000');
// });

// in order to create a server we need to listen o a port on our computer

// everyting is attached to our app server usually 3000 - 9000

//
// app.get('/', (request, response) => {
// // this is how we send info back to the client aka (browser)
//   response.send('Hello AGAIN from the server, Im sending this message to the client')
// });

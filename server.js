const express = require('express');
//init the express object
const app = express(); //app is an object
const bodyParser = require('body-parser');
//include the method-override package
var methodOverride = require('method-override');
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
// require our model (fruit array from file fruits.js)
//model should be capitalized
// this is our view for the server
const Fruits = require('./models/fruits')

// put body parser BEFORE any routes
// its saying we want the body to be an object
// we initialized some middleware
// bodyParser allows us to read the contents of a form , or the body of the form
// the app.use sets up what middleware you are using
app.use(bodyParser.urlencoded({extended: false}))



//creating the index route
// below is our index route should show all the fruits
// listeing for a GET request
app.get('/fruits', (req, res) => {
res.render('index.ejs', {
fruits: Fruits });
});
// app.get('/fruits/:index', (req, res) => {
// res.render('show.ejs', {
//   fruit: Fruits[req.params.index]
// create a new route that is a post request in the new ejs
// listening for a POST request
app.post('/fruits', (req, res) => {
// grabbing the info from the body that now lives in req.body and pushing it into our model, on needs to === true off needs to === false
if(req.body.readyToEat === 'on') {
  req.body.readyToEat = true;
} else {
  req.body.readyToEat = false;
}
Fruits.push(req.body);

// the contents of the form will be in req.body
console.log(req.body, 'this is req.body, shoud be the form info');
  res.redirect('/fruits');
})



// create our new route in a new ejs
app.get('/fruits/new', (req, res) => {
  res.render('new.ejs');
});

app.get('/fruits/:index/edit', function(req, res){
	res.render(
		'edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			fruit: fruits[req.params.index], //the fruit object
			index: req.params.index //... and its index in the array
		}
	);
});

// show route
app.get('/fruits/:index', (req, res) => {
res.render('show.ejs', {
  fruits: Fruits[req.params.index]
})
});

app.delete('/fruits/:index', (req, res) => {
	Fruits.splice(req.params.index, 1); //remove the item from the array
	res.redirect('/fruits');  //redirect back to index route
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

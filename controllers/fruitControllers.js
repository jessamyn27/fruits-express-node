
const express = require('express');
// Next we set up the Router
const router = express.Router();
// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized
const Fruits = require('../models/fruits');
// Creating the index route
// index route should show all the fruits
router.get('/', (req, res) => {
  res.render('index.ejs', {
    fruits: Fruits
  });
});

// This is the route that the form is sending
// its info too
// aka the create route
router.post('/', (req, res) => {
  // contents of the form will be in req.body

  console.log(req.body, 'this is req.body, should be form info');
  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  // adding the contents of the form to the model
  Fruits.push(req.body);
  // Now we can add the info from the form to our model
  // update our model

  // redirects the response back
  // to the get /fruits route
  res.redirect('/fruits');
  // res.send('it was completed')
});


// Create our new Route

router.get('/new', (req, res) => {
  // This is where we are showing the form
  res.render('new.ejs');
});

// Edit Route = to display a single fruit
router.get('/:index/edit', (req, res) => {

  res.render('edit.ejs', {
    fruit: Fruits[req.params.index],
    index: req.params.index
  });

});


// Show Route
router.get('/:index', (req, res) => {

  // Render is when you want to send
  // an ejs template to the client
  res.render('show.ejs', {
    fruit: Fruits[req.params.index] // This creates
    // a "fruit" variable in the show page
  });
});

router.put('/:index', (req, res) => {
  console.log(' am I hitting the put route') // Check to see if im hitting im route
  // If Im not hitting the route, there is probably something with the action of form

  // If it is hitting the route, I want to see
  console.log(req.body, 'Why: IT tells what is coming from the form')

  if(req.body.readyToEat === 'on'){ // if checked then req.body.readyToEat = 'on'
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  // req.body is the updated form info


  // Maybe its agood idea to check every part of this code
  Fruits[req.params.index] = req.body;
  // Check to see if it is updating correctly
  console.log(Fruits, ' CHeck our model')
  res.redirect('/fruits');
});


// Delete route
router.delete('/:index', (req, res) => {
  Fruits.splice(req.params.index, 1);
  console.log(req.params.index, ' this is req.params')
  res.redirect('/fruits');
})



module.exports = router;

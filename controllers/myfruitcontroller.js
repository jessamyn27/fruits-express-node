
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
// UPDATE this is finding every fruit without a search parameter
  Fruits.find({}, (err, allFruits) => {
    if(err){
      res.send(err);
    } else {
      res.render('index.ejs', {
        fruits: allFruits
        // UPDATE now calling this allFruits b/c this is the response from our db and when you are finding all of something it returns an array
      });
    };
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

  // UPDATE deleted the Fruits.post and put this
Fruits.create(req.body, (err, createdFruits) => {
  if(err){
    console.log(err)
  } else {
    console.log(createdFruits)
    res.redirect('/fruits');
// uUPDATE moved res.redirect into this b/c we dont want to redirect until we'actually have some info in there
  }
});
});
// UPDATE we want to respond to the client after we get the response from the data base
// Now we can add the info from the form to our model
  // update our model

  // redirects the response back
  // to the get /fruits route
  // res.send('it was completed')



// Create our new Route
router.get('/:id/edit', (req, res) => {
  //^^^ when you want to grab this out, you use req.params

  Fruits.findById(req.params.id, (err, foundFruit) => {
    res.render('edit.ejs', {
      fruit: foundFruit //finds one fruit
    });
  });
});

  // This is where we are showing the form

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
  // new true says, retur to me the updted object, by default it is false
  // things that are default you don't have to speficy

  // first argument, is the document you are looking for
  // second argument is the content you ar updating with
Fruits.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFruit) => {
  if (err) {
    res.send(err);
  } else {
    console.log(updatedFruit, ' check our model')
    res.redirect('/fruits');
  }
})
});


// Delete route
router.delete('/:index', (req, res) => {
  Fruits.splice(req.params.index, 1);
  console.log(req.params.index, ' this is req.params')
  res.redirect('/fruits');
})



module.exports = router;

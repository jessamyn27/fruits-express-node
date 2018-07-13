const express = require('express');
// Next we set up the Router
const router = express.Router();
// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized
const Fruits = require('../models/fruits');
// Creating the index route
// index route should show all the fruits



//commenting this out to find all fruits in the database without any parameters

// router.get('/', (req, res) => {
//   res.render('index.ejs', {
//     fruits: Fruits
//   });
// });

//instead writing this here

router.get('/', (req, res) => {

Fruits.find({}, (err, allFruits) => {
  if (err) {
    res.send(err);
  } else {
    //allFruits is the response from our db and when you are finding all of something it returns an array
    res.render('index.ejs', {
      fruits: allFruits
    })
  }
})

  // res.render('index.ejs', {
  //   fruits: allFruits
  // });
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


  //we are getting rid of fruits.push because we will create something inside fruits below
  // Fruits.push(req.body);

// we are creating the new fruit by using the infor that lives in req.body

Fruits.create(req.body, (err, createdFruit) => {
  if(err) {
    console.log(err)
  } else {
    console.log(createdFruit)

    // we want to respond to the client after we get the response from the database. hence we will put our res.redirect /fruits inside this function
    // this will redirect the response back to get /fruits route

    res.redirect('/fruits');
  }
})



  // Now we can add the info from the form to our model
  // update our model

  // redirects the response back
  // to the get /fruits route

  // res.redirect('/fruits'); **

  // res.send('it was completed')
});


// Create our new Route

router.get('/new', (req, res) => {
  // This is where we are showing the form
  res.render('new.ejs');
});

// Edit Route = to display a single fruit
router.get('/:id/edit', (req, res) => {

  Fruits.findById(req.params.id, (err, foundFruit) => {
    res.render('edit.ejs', {
      fruit: foundFruit
    });
  })
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

router.put('/:id', (req, res) => {
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
// new:true says return to me the updated object
// by default it is false and things that are false you don't have to specify
//first argument is the document you are looking for
// second is the content we are updating
//
Fruits.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateFruit) => {
  if (err) {
    res.send(err)
  } else {
    console.log(updateFruit, 'Check out model')
    res.redirect('/fruits')
  }
})
});
  // Maybe its agood idea to check every part of this code
  // Fruits[req.params.index] = req.body;
  // Check to see if it is updating correctly





// Delete route
router.delete('/:index', (req, res) => {
  Fruits.splice(req.params.index, 1);
  console.log(req.params.index, ' this is req.params')
  res.redirect('/fruits');
})



module.exports = router;

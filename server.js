const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized

// require our db
require('./db/db');

// initialized some middleware
// bodyParser allows us to read the
// contents of a form, or the body of a request
// the app.use sets up what middleware you are using
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'));

// require the controller after the middleware
const fruitControllers = require('./controllers/fruitControllers');

// this means every route in the fruit controller starts with /fruits
app.use('/fruits', fruitControllers);


//==========================
app.listen(3000, () => {
  console.log('listening on port 3000');
});

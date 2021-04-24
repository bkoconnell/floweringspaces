
/** 
 * App Server Routers
 */


// Dependencies
const express = require('express');
const router = express.Router(); // import Router() function
// instantiate controllers
const ctrlMain = require('../controllers/main');
const ctrlNursery = require('../controllers/nursery');
const ctrlLandscapes = require('../controllers/landscapes');


// index router
router.get('/', ctrlMain.index);

// nursery router
router.get('/nursery', ctrlNursery.nurseryList);

// landscapes router
router.get('/landscapes', ctrlLandscapes.landscapes);


// export router
module.exports = router;

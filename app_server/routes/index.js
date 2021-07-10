
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
const ctrlTestimonials = require('../controllers/testimonials');
const ctrlGardenblog = require('../controllers/gardenblog');
const ctrlAbout = require('../controllers/about');
const ctrlContact = require('../controllers/contact');


// index router
router.get('/', ctrlMain.index);

// nursery router
router.get('/nursery', ctrlNursery.nurseryList);

// landscapes router
router.get('/landscapes', ctrlLandscapes.landscapes);

// testimonials router
router.get('/testimonials', ctrlTestimonials.testimonials);

// gardenblog router
router.get('/gardenblog', ctrlGardenblog.gardenblog);

// about router
router.get('/about', ctrlAbout.about);

// contact router
router.get('/contact', ctrlContact.contact);


// export router
module.exports = router;

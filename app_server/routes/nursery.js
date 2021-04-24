
/* Nursery Router */

// dependencies
const express = require('express');
const router = express.Router(); // import Router() function
const ctrlNursery = require('../controllers/nursery');

/* GET nursery page from controller */
router.get('/', ctrlNursery.nurseryList);

// export
module.exports = router;
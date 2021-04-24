
/* Index Router */

// dependencies
const express = require('express');
const router = express.Router(); // import Router() function
const ctrlMain = require('../controllers/main');

/* GET home page from controller */

// DEBUG
console.log('Requesting main page');

router.get('/', ctrlMain.index);

// DEBUG
console.log('Request returned successfully to the router.');



// export
module.exports = router;

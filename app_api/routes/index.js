// dependencies
const express = require('express');
const router = express.Router(); // import Router() function
const flowersController = require('../controllers/flowers');


// flowers router
router
    .route('/flowers')
    .get(flowersController.flowersList);

// flowersCode router 
router
    .route('/flowers/:flowerCode')  // pass parameter --> "flowerCode"
    .get(flowersController.flowersFindCode);


// export router
module.exports = router;
// dependencies
const express = require('express');
const router = express.Router(); // import Router() function
const flowersController = require('../controllers/flowers');


// flowers router
router
    .route('/flowers')
    .get(flowersController.flowersList)
    .post(flowersController.flowersAddFlower);

// flowersCode router 
router
    .route('/flowers/:flowerCode')  // pass parameter --> "flowerCode"
    .get(flowersController.flowersFindCode)
    .put(flowersController.flowersUpdateFlower);


// export router
module.exports = router;
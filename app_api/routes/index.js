// dependencies
const express = require('express');
const flowersController = require('../controllers/flowers');
// assign router function
const router = express.Router();


/* Flowers Router */
router
    .route('/flowers')
    .get(flowersController.flowersList)
    .post(flowersController.flowersAddFlower);

router // URL parameter --> "flowerCode"
    .route('/flowers/:flowerCode')  
    .get(flowersController.flowersFindCode)
    .put(flowersController.flowersUpdateFlower)
    .delete(flowersController.flowersDeleteFlower);


// export routers
module.exports = router;
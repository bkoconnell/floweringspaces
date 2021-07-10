/**
 * REST API --> Routers
 */

// Dependencies
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const flowersController = require('../controllers/flowers');
const jwt = require('express-jwt');

// JSON web token call
const auth = jwt({
    secret: process.env.JWT_SECRET, // pass in secret
    algorithms: ['HS256'],  // required to prevent potential downgrade attacks when providing third party libraries as secrets
    userProperty: 'payload' // token
});


/**
 * Authentication Routers
 */
// register
router
    .route('/register')
    .post(authController.register);
// login
router
    .route('/login')
    .post(authController.login);

/**
 * Flowers Routers
 */
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
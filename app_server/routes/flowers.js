// imports
const express = require('express');
const router = express.Router();
const ctrlFlowers = require('../controllers/flowers');

/* GET flowers page */
router.get('/', ctrlFlowers.flowers);

// export
module.exports = router;
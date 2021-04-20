// dependencies
const express = require('express');
const router = express.Router();  // import Router() function
const ctrlMain = require('../controllers/main');

/* GET home page from controller */
router.get('/', ctrlMain.index);

// export
module.exports = router;

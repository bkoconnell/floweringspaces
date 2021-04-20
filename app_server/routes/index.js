// imports
const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page from controller */
router.get('/', ctrlMain.index);

// export
module.exports = router;

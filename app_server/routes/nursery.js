// imports
const express = require('express');
const router = express.Router();
const ctrlNursery = require('../controllers/nursery');

/* GET nursery page */
router.get('/', ctrlNursery.nursery);

// export
module.exports = router;
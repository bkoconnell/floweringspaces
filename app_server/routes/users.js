// dependencies
const express = require('express');
const router = express.Router(); // import Router() function

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// export
module.exports = router;

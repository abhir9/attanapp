var express = require('express');
var router = express.Router();
var check = require('./check');
var make = require('./make');

global.loggedin=false;
router.post('/check',check);
router.post('/make',make);

module.exports = router;

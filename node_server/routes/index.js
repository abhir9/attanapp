var express = require('express');
var router = express.Router();
var check = require('./check');
var make = require('./make');
var history = require('./history');

global.loggedin = false;
router.post('/check', check);
router.post('/make', make);
router.post('/history', history);

module.exports = router;

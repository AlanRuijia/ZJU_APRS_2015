var express = require('express');
var router = express.Router();
var dataController = require('../controllers/data.js');

router.post('/weather', dataController.weather);
router.post('/moving_object', dataController.moving_object);

module.exports = router;

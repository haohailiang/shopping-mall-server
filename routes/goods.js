var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://192.168.0.172:27017/dumall');

mongoose.connection.on("connected", function () {
	console.log("mongoDB链接成功.");
})

mongoose.connection.on("error", function () {
	console.log("mongoDB链接失败.");
})

mongoose.connection.on("disconnected", function () {
	console.log("mongoDB断开链接.");
})

router.get('/', function(req, res, next) {
	res.send('hello, goods list. ');
})

module.exports = router;
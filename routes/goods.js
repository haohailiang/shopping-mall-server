var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://192.168.0.173:27017/dumall');

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
	// res.json({
	// 	status:1,
	// 	msg:'haha'
	// });
	Goods.find({}, function (err, docs) {
		// docs.forEach
		if(err){
			res.json({
				status:'1',
				msg:err.message
			});
		}else{
			res.json({
				status:'0',
				msg:'',
				result:{
					count:docs.length,
					list:docs
				}
			});
		}
	});
})

module.exports = router;
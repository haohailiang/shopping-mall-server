var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://192.168.0.173:27017/dumall');

mongoose.connection.on("connected", () => {
	console.log("mongoDB链接成功.");
})

mongoose.connection.on("error", () => {
	console.log("mongoDB链接失败.");
})

mongoose.connection.on("disconnected", () => {
	console.log("mongoDB断开链接.");
})

router.get('/list', (req, res, next) => {
	// res.json({
	// 	status:1,
	// 	msg:'haha'
	// });
	let page = +(req.param('page'));
	let pageSize = +(req.param('pageSize'));
	let priceLevel = req.param('priceLevel');
	let sort = +(req.param('sort'));
	let skip = (page-1)*pageSize;

	let params = {};
	let priceGt = 0, priceLte = 0;
	if(priceLevel !=='all'){
		switch (priceLevel){
			case '0':priceGt=0; priceLte=100;break;
			case '1':priceGt=100; priceLte=500;break;
			case '2':priceGt=500; priceLte=1000;break;
			case '3':priceGt=1000; priceLte=5000;break;
		}
		params = {
			"salePrice":{
				$gt:priceGt,
				$lte:priceLte
			}
		};
	}
	let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	goodsModel.sort({"salePrice":sort});
	goodsModel.exec((err, docs)=> {
	// Goods.find({}, function (err, docs) {
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

//加入到购物车
router.post('/addCart', (req, res, next) => {
	let userId = '100000077';
	let productId = req.body.productId;
	let User = require('../models/user.js');
	User.findOne({userId:userId}, (err, userDoc) => {
		if(err){
			res.json({
				status:'1',
				msg:err.message
			});
		}else{
			console.log(userDoc);
			if(userDoc){
				let goodsItem = '';
				userDoc.cartList.forEach(item =>{
					if(item.productId == productId){
						goodsItem = item;
						item.productNum++;
					}
				});
				if(goodsItem){
					userDoc.save((err2, doc2) => {
						if(err2){
							res.json({
								status:"1",
								msg:err2.message
							});
						}else{
							res.json({
								status:"0",
								msg:'用户数据更新成功',
								result:'suc'
							});
						}
					});
				}else{
					Goods.findOne({productId:productId}, (err1, doc) => {
						if(err1){
							res.json({
								status:'1',
								msg:err1.message
							});
						}else{
							if(doc){
								doc.productNum = 1;
								doc.checked = 1;
								userDoc.cartList.push(doc);
								userDoc.save((err2,doc2) => {
									if(err2){
										res.json({
											status:'1',
											msg:err2.message
										});
									}else{
										res.json({
											status:'0',
											msg:'商品保存成功',
											result:'suc'
										});
									}
								});
							}
						}
					});
				}
			}
		}
	});
});

module.exports = router;
let express = require('express');
let router = express.Router();

let User = require('../models/user.js');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/test', (req, res, next) => {
	res.send('test');
});

router.post('/login', (req, res, next) => {
	var param = {
		userName:req.body.userName,
		userPwd:req.body.userPwd
	};
	User.findOne(param, (err, doc) => {
		if(err){
			res.json({
				status:"1",
				msg:err.message
			});
		}else{
			if(doc){
				res.cookie('userId',doc.userId,{
					path:'/',
					maxAge:1000*60*60
				});
				res.json({
					status:"0",
					msg:'',
					result:{
						userName:doc.userName
					}
				});
			}
		}
	});
});

module.exports = router;

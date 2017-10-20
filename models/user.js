let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	"userId"			: String,
	"userName"		: String,
	"userPwd"			: String,
	"orderList"		: Array,
	"cartList"		: [
		{
			"productId"     :String,
			"productName"   :String,
			"salePrice"     :String,
			"productImage"  :String,
			"checked"       :String,
			"productNum"    :String
		}
	]
});

module.exports = mongoose.model('User', userSchema, 'users');
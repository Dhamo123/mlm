module.exports = function (model) {
	var module = {};

	const config = require('../../config/constants.js');
	
	module.mlm = require('./admin/mlm')(model,config);
	
	
	return module;
}

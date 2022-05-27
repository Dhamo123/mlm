module.exports = function (Sequelize, Schema) {
	var module = {};
	
	module.MLM = require('./mlm')(Sequelize, Schema);

	return module;
}

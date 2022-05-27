module.exports = function(Sequelize, Schema){

	var MLM = Schema.define('mlm_master', {
	    name:{
            type: Sequelize.STRING
        },
        mlmid:{
	        type: Sequelize.STRING,
            defaultValue: 0 
        },
        address:{
            type: Sequelize.TEXT
        },
        email:{
            type: Sequelize.STRING
        },
        no_of_descendents: { 
            type: Sequelize.STRING,
            defaultValue: 0 
        },
        contact_no: { 
            type: Sequelize.STRING,
            defaultValue: '00'
        },
        total_loyalty_point: { 
            type: Sequelize.STRING,
            defaultValue: 0 
        },
        is_deleted:{
            type: Sequelize.ENUM('1', '0'), defaultValue:'0'
        }
	}, {underscored: true});

	MLM.sync({force: false});

	return MLM;
}
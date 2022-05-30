var dateformat = require('dateformat');
var currentDate = new Date();
var Op = Sequelize.Op;

module.exports = function(model,config){	
	var module = {};

	module.view = function(request, response){
		response.render('backend/mlm/mlm', {
			title: "customer's Managment",
			error: request.flash("error"),
			success: request.flash("success"),
			vErrors: request.flash("vErrors"),
			auth: request.session,
			config: config,
			alias:'customer',
			subAlias:'customer',
		});
	};

	module.getMlm = async function(request, response){

		var start = parseInt(request.query.start);
	    var length = parseInt(request.query.length);
	    var search = request.query.search.value;
	    var query = {"is_deleted":"0"};
	    if (search != '') {
	      	query = { [Op.or]:[
				{'name': {[Op.like]: '%'+search+'%'}},
				{'email': {[Op.like]: '%'+search+'%'}},
				{'no_of_descendents': {[Op.like]: '%'+search+'%'}},
				{'contact_no': {[Op.like]: '%'+search+'%'}},
				{'total_loyalty_point': {[Op.like]: '%'+search+'%'}},
	      	],"is_deleted":"0"};
	    }
	    
	    var mlmCount = await model.MLM.count({where:query});
	    var mlm = await model.MLM.findAll({where:query, order:[['id','desc']], offset:start, limit:length, raw:true});
		
		for (var i = 0; i < mlm.length; i++) {
			mlm[i].indexno = i + 1;
			mlm[i].editDel =  '<a style="margin-left:5px; font-size: 15px;margin-bottom:5px" href="/edit/' + mlm[i].id + '" class="btn btn-primary btn-sm" title="Edit"><i class="glyphicon glyphicon-edit"></i></a><a style="margin-left:5px; font-size: 15px;" href="/delete/' + mlm[i].id + '" class="btn btn-primary btn-sm"  onClick="return confirm(\'Are you sure you want to delete this customer?\')" title="delete"><i class="glyphicon glyphicon-trash"></i></a>';
	    }

	    var obj = {
	      	'draw': request.query.draw,
	      	'recordsTotal': mlmCount,
	      	'recordsFiltered': mlmCount,
	      	'data': mlm
	    };
	    
	    return response.send(JSON.stringify(obj));
	};

	

	module.add = async function(request, response){
		var mlm_user = await model.MLM.findAll({where:{"is_deleted":"0"}, order:[['id','desc']], raw:true});
		response.render('backend/mlm/add', {
			title: 'New customer',
			error: request.flash("error"),
			success: request.flash("success"),
			vErrors: request.flash("vErrors"),
			auth: request.session,
			config: config,
			alias:'customer',
			subAlias:'add',
			mlm_user:mlm_user,
		});
	};

	module.save = async function(request, response){

		var inputData = {
			name : request.body.name,
			contact_no : request.body.contact_no,
			address : request.body.address,
			mlmid: request.body.mlmid,
			email: request.body.email
      	};
      	try{
      		if(request.body.mlmid!=0){
      			await module.mlm_cycle(request.body.mlmid,config.loyalty_point);
      		}
	      	
			var mlmData = await model.MLM.create(inputData);
			if(mlmData != null){
				request.flash('success',"customer add successfully");
				response.redirect('/');
			}else{
				request.flash('error',"customer detail not save.");
				response.redirect('/');
			}
			
		}catch(err){
			console.log(err)
			request.flash('error',"customer detail not save.");
			response.redirect('/');
		}
	};

	//////////////////mlm chaeck and add////////////////////////
	module.mlm_cycle = async function(id,loyalty_point){
		try{
		var mlmData = await model.MLM.findByPk(id);
		if(mlmData != null){

			let point = parseInt(parseInt(mlmData.dataValues.total_loyalty_point) + parseInt(loyalty_point));
			let no_of_descendents = parseInt(parseInt(mlmData.dataValues.no_of_descendents) + parseInt(1));
			await mlmData.update({total_loyalty_point:point,no_of_descendents:no_of_descendents});
			await module.mlm_cycle(mlmData.mlmid,loyalty_point);
			loyalty_point = loyalty_point;
		}
		
		return loyalty_point;
		}catch(err){
			console.log("err========",err)
		}
	};
	module.delete_mlm_cycle = async function(id){
		try{
		var mlmData = await model.MLM.findByPk(id);
		if(mlmData != null){

			let no_of_descendents = parseInt(parseInt(mlmData.dataValues.no_of_descendents) - parseInt(1));
			await mlmData.update({no_of_descendents:no_of_descendents});
			await module.mlm_cycle(mlmData.mlmid);
			id = id;
		}
		
		return id;
		}catch(err){
			console.log("err========",err)
		}
	};
	module.checkDuplicate = async function(request, response){

		var email = request.body.email;
		
		let condition = {email:email,is_deleted:"0"};
		if(request.body.id){
	      condition.id = {[Op.ne]: request.body.id};
	    }
	    
	    var mlmDetail = await model.MLM.findOne({where:condition});
		
		if(mlmDetail){
	      	response.send("false");
	    }else{
	      	response.send("true");
	    }
	};

	module.edit = async function(request, response){
		var mlmId = request.params.id;
		if(mlmId != "" && mlmId != 0){
			try{
				var mlm_user = await model.MLM.findAll({where:{"is_deleted":"0",id: { $not: mlmId}}, order:[['id','desc']], raw:true});
				var mlmDetail = await model.MLM.findByPk(mlmId);
				console.log("mlmDetail==",mlmDetail)
				if(mlmDetail != null){
					response.render('backend/mlm/edit', {
						title: 'Edit',
						error: request.flash("error"),
						success: request.flash("success"),
						vErrors: request.flash("vErrors"),
						auth: request.session,
						config: config,
						mlm:mlmDetail,
						mlm_user:mlm_user,
						alias:'customer',
						subAlias:'add',
					});
				}else{
					console.log("mlmDetail22==",err)
					request.flash('error',"mlm detail not available.");
					response.redirect('/');
				}
			}catch(err){
				console.log("mlmDetail==",err)
				request.flash('error',"mlm detail not available.");
				response.redirect('/');
			}			
		}else{
			console.log("mlmDetail1==",err)
			request.flash('error',"mlm detail not available.");
			response.redirect('/');
		}		
	};
	
	module.update = async function(request, response){
		var mlmId = request.params.id;
		if(mlmId != "" && mlmId != 0){
			try{
				var mlmData = await model.MLM.findByPk(mlmId);
				if(mlmData != null){

					var inputData = {
						name : request.body.name,
						contact_no : request.body.contact_no,
						address : request.body.address,
						mlmid: request.body.mlmid,
						email: request.body.email
			      	};

					var update_data = await mlmData.update(inputData);
					request.flash('success',"customer detail update successfully.");
					response.redirect('/');
				}else{
					request.flash('error',"customer detail not update.");
					response.redirect('/');
				}
			}catch(err){
				request.flash('error',"customer detail not update.");
				response.redirect('/');
			}
		}else{
			request.flash('error',"customer detail not update.");
			response.redirect('/');
		}
	};
	///////////////////////////////Soft Delete///////////////////////////////////
	module.delete = async function(request, response){
		var mlmId = request.params.id;
		try{
			var mlmData = await model.MLM.findByPk(mlmId);
			if(mlmData){
				var inputData = {
					is_deleted : "1",
					
				};
				var update_data = await mlmData.update(inputData);
				await module.delete_mlm_cycle(mlmData.mlmid);
				request.flash('success',"customer delete successfully.");
				response.redirect('/');
			}else{
				request.flash('error',"mlm detail not delete.");
				response.redirect('/');
			}		
		}catch(err){
			console.log(" delete error: ", err);
			request.flash('error'," not delete.");
			response.redirect('/');
		}		
	};

	return module;
}

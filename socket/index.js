var flag = true;
const { query } = require('express');
var lowerCase = require('lower-case');
var moment = require('moment');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var fs = require('fs');
var Buffer = require('buffer/').Buffer
var dateformat = require('dateformat');
var currentDate = new Date();
var apiLang = require('../config/api_lang');
var translate = require('translate-google');
const { log } = require('console');

//var fcm_push = require('fcm-notification');
//var FCM_Push = new fcm_push('/var/www/html/privatekey.json');
module.exports = function (model, io, client) {
	var config = require('../config/constants.js');

	//Start: User Notification Send
	client.on('test', async function (data, callback) {
		console.log("sendUserNotification: ", data)
		return callback({ 'status': 'false', "message": "Please enter proper data" });
	});
	

}



// add soketId in users Table									Done
// user can send image in chat									Done
// make offer delete if any ine delete
// make changes in offer by sellers_id buyers_id
// make changes in offer by is_deleted // deleteConversation 

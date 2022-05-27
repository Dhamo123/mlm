const env = process.env.NODE_ENV || "localhost"

var config = {
	development: {
		
	},
	production: {
		
	},
	localhost: {
		"port": 4000,
		"baseUrl": "http://localhost:4000/",
		"siteName": "Koops",
		"jwt_secret": "appjwttokenfetyuhgbcase45w368w3a",
		"jwt_expire": "365d",
		"loyalty_point":5,

		
	}
}
module.exports = config[env]

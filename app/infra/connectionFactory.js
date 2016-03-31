var mysql = require('mysql');

var createConnection = function(){
	if (process.env.NODE_ENV == 'production'){
		return mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'root',
			database:'casadocodigo_nodejs'
		});
	}

	if (process.env.NODE_ENV == 'test'){
		return mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'root',
			database:'casadocodigo_nodejs_test'
		});
	}
}

module.exports = function(){
	return createConnection;
}
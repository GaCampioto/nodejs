var mysql = require('mysql');

var createConnection = function(){
	if (process.env.NODE_ENV == 'production'){
		var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
		var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
		//POSICAO 0 SEMPRE É A EXPRESSÃO COMPLETA
		return mysql.createConnection({
			host:grupos[3],
			user:grupos[1],
			password:grupos[2],
			database:grupos[4]
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
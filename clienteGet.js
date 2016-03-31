var http = require('http');

var configuracoes = {
	hostname:'localhost',
	port:3000,
	path:'/produtos',
	headers:{
		'Accept':'application/json'
	}
};

var httpget = function (response){
	console.log(response.statusCode);
	response.on('data', function(body){
		console.log('corpo: ' + body);
	});
}

http.get(configuracoes, httpget);
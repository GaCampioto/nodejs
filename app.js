var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.set('io',io);
//PORTA PARA ABRIR NO HEROKU
var porta = process.env.PORT || 3000;
http.listen(porta, function(){
	console.log('Servidor rodando');
});


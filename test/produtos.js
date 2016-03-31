var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');

describe('#ProdutosController', function(){
	beforeEach(function(done){
			var databaseCleaner = new DatabaseCleaner('mysql');
			var connection = express.infra.connectionFactory();
			databaseCleaner.clean(connection, function(){
				connection.end();
			});
			done();
	});

	it('#listagem json', function(done){
		request.get('/produtos')
			.set('Accept', 'application/json')
			.expect('Content-type', /json/)
			.expect(200, done);
	});

	it('#cadastro produtos dados válidos', function(done){
		request.post('/produtos')
			.set('Content-type', 'application/json')
			.set('Accept', 'application/json')
			.send({titulo:"titulo", descricao:"novo livro", preco:40.50})
			.expect(302, done);
	});

	it('#cadastro produtos dados inválidos', function(done){
		request.post('/produtos')
			.set('Content-type', 'application/json')
			.set('Accept', 'application/json')
			.send({titulo:"", descricao:"novo livro"})
			.expect(400, done);
	});
});
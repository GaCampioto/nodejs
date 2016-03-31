module.exports = function(app){
	app.get('/promocoes/form', function(req, res){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(erros, results){
			res.render('promocoes/form', {livros:results});
		});		
		connection.end();
	});

	app.post('/promocoes', function(req, res){
		var promocao = req.body;
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.getById(promocao.livro.id, function(erros,results){
			promocao.livro = results;
			console.log(promocao);
			app.get('io').emit('novaPromocao', promocao);
			res.redirect('/promocoes/form');
		});
		connection.end();
	});
}
module.exports = function(app){
	app.get('/', function(req, res){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(erros, results){
			console.log(results);
			console.log(results.length);
			console.log(results[0].titulo);
			res.render('home/index', {livros:results});
		});		
		connection.end();
	});
}
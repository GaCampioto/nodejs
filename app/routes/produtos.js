module.exports = function (app){
	var listaProdutos = function(request, response, next){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(erros, results){
			if(erros){
				return next(erros);
			}
			response.format({
				html:function(){
					response.render('produtos/lista', {lista: results});
				},
				json:function(){
					response.json(results);
				}
			});
		});		
		connection.end();
	}

	app.get('/produtos', listaProdutos);

	app.get('/produtos/form', function (request, response){
		response.render('produtos/form', {errosValidacao:{}, livro:{}});
	});

	app.get('/produtos/deletar', function (request, response){
		response.render('produtos/deletar');
	});

	app.post('/produtos', function (request, response){
		var livro = request.body;
		request.assert('titulo', 'Título é obrigatório').notEmpty();
		request.assert('preco', 'Preço deve ser numérico').isFloat();

		var erros = request.validationErrors();		
		if(erros){
			response.format({
				html:function(){
					response.status(400).render('produtos/form', {errosValidacao:erros, livro:livro});
					return;
				},
				json:function(){
					response.status(400).send(erros);
				}
			});
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.salvar(livro, function(erros, resultados){
			//ALWAYS REDIRECT AFTER POST
			response.format({
				html:function(){
					response.redirect('/produtos');
				},
				json:function(){
					response.status(302).send();
				}
			});
		});
	});

	app.post('/produtos/delete', function (request, response){
		var livro = request.body;
		console.log('conteudo delete: ' + livro);

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.deletar(livro, function(erros, resultados){		
			//ALWAYS REDIRECT AFTER POST
			response.format({
				html:function(){
					response.redirect('/produtos');
				},
				json:function(){
					response.status(302).send();
				}
			});
		});	
	});
}
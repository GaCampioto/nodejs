function ProdutosDAO (connection){
	this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
	this._connection.query('select * from livros', callback);
}

ProdutosDAO.prototype.getById = function(id, callback){
	this._connection.query('select id, titulo, preco from livros where id = ?', id, callback);
}

ProdutosDAO.prototype.salvar = function (livro, callback){
	this._connection.query('insert into livros set ?', livro, callback);
}

ProdutosDAO.prototype.deletar = function (livro, callback){
	this._connection.query('delete from livros where id = ?', livro.id, callback);
}

module.exports = function(){
	return ProdutosDAO;
}

var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function(res){
    console.log(res.statusCode);
    res.on('data', function(body){
        console.log('Corpo:' +body);
    });
});

var livro = {
    titulo : '',
    descricao : 'node, javascript e um pouco de http 2',
    preco : '32.0'
}

client.end(JSON.stringify(livro));
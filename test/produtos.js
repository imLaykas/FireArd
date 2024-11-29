var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function () {
    it('#listagem json', function (done) {
        //quero fazer um get para produtos
        request.get('/produtos')
            //quero definir o cabeçalho e espero o application/json como resposta
            .set('Accept', 'application/json')
            //quero fazer uma asserção que o tipo de resposta vai ter um json
            .expect('Content-Type', /json/)
            //espero um status 200 e quando acabar basta que invoque a função de finalização
            .expect(200, done);
    });

    it('#cadastro de produto com dados inválidos', function(done){
        //quero fazer um post para os produtos
        request.post('/produtos')
        //quero fazer um send para inserir os dados no banco
        .send({titulo:"", descricao:"novo livro"})
        //se a validação funcionar, esperamos como retorno o status 400 (bad request)
        .expect(400, done);
    });

    it('#cadastro de produto com dados válidos', function(done){
        //quero fazer um post para os produtos
        request.post('/produtos')
        //quero fazer um send para inserir os dados no banco
        .send({titulo:"titulo", descricao:"novo livro", preco: 20.50})
        //com a validação funcionando, esperamos como retorno o status 302
        .expect(302, done);
    });
});
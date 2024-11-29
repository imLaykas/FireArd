var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');

module.exports = function () {
    var app = express();

    app.use(express.static('./app/public'));
    app.use(express.static('public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    /*Use: recebe funções que são aplicadas 
    ao request na ordem que definimos 
    sequencialmente */

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    // Configuração da sessão
    app.use(session({
        secret: 'seu_segredo_aqui', // Use uma string secreta forte em produção
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // Defina como true se usar HTTPS
    }));

    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app);
    return app;
}
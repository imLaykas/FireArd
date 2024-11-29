var app = require('./config/express')();
var rotasHome = require('./app/routes/home')(app);
var rotasUsuarios = require('./app/routes/usuarios')(app);
var rotasFeedback = require('./app/routes/feedback')(app);

app.listen(3050, function(){
    console.log("Servidor Rodando na porta 3050!");
});
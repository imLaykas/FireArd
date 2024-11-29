module.exports = function (app) {
    app.get("/", function (request, response) {
        //response.render('usuarios/login', { erro: null });
        response.render('home/index', { usuario: request.session.usuario });
      });
};
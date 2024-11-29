module.exports = function (app) {
    app.get("/informacoes", function (request, response) {
        response.render('info/informacoes', {usuario: request.session.usuario});
      });
};
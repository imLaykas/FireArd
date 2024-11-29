module.exports = function (app) {
    app.get("/monitoramento", function (request, response) {
        response.render('monitoramento/monitoramento', {usuario: request.session.usuario});
      });
};
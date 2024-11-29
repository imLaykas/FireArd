module.exports = function (app) {
    app.get("/sobreNos", function (request, response) {
        response.render('sobrenos/sobreNos', {usuario: request.session.usuario});
      });
};
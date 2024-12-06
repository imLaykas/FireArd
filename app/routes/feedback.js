module.exports = function (app) {
    // Rota GET para exibir a página de feedback com erros ou campos vazios
    app.get('/feedback', function (req, res) {
        res.render('feedback/feedback', { usuario: req.session.usuario, errosValidacao: {}, feedback: {} });
    });

    // Rota POST para processar o feedback
    app.post('/feedback', function (req, res) {
        var feedback = req.body; // Dados do formulário
      
        // Validação dos campos
        req.assert('nome', 'Nome é obrigatório!').notEmpty();
        req.assert('email', 'E-mail é obrigatório!').notEmpty();
        req.assert('mensagem', 'Mensagem é obrigatória!').notEmpty();
      
        var erros = req.validationErrors();
        if (erros) {
          return res.format({
            html: function () {
              res.status(400).render('feedback/feedback', { errosValidacao: erros, feedback: feedback });
            },
            json: function () {
              res.status(400).json(erros);
            }
          });
        }
      
        console.log(feedback);
      
        var connection = app.infra.connectionFactory();
        var feedbackBanco = new app.infra.FeedbackDAO(connection);
      
        feedbackBanco.salva(feedback, function (err, results) {
          if (err) {
            console.log('Erro ao salvar feedback:', err);
            return res.status(500).send('Erro ao salvar feedback');
          }
          res.redirect("/feedback");
        });
      
        connection.end();
      });
      
};

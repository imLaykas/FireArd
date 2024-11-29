function FeedbackDAO(connection) {
  this._connection = connection;
}

FeedbackDAO.prototype.salva = function (feedback, callback) {
  // Verificando se as propriedades necessárias existem no objeto feedback
  if (!feedback.nome || !feedback.email || !feedback.mensagem) {
    return callback(new Error('Todos os campos (nome, email, mensagem) são obrigatórios.'));
  }

  // Mapeando o objeto de feedback para garantir que os nomes dos campos sejam consistentes
  const feedbackData = {
    nome_feedback: feedback.nome,
    email_feedback: feedback.email,
    mensagem: feedback.mensagem
  };

  // Inserção no banco de dados
  this._connection.query('INSERT INTO feedback SET ?', feedbackData, callback);
};

module.exports = function () {
  return FeedbackDAO;
};

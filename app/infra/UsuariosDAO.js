function UsuariosDAO(connection) {
    this._connection = connection;
}

UsuariosDAO.prototype.buscarPorEmail = function (email, callback) {
    this._connection.query('SELECT * FROM usuario WHERE email = ?', [email], callback);
};

UsuariosDAO.prototype.lista = function (callback) {
    this._connection.query("select * from usuario", callback);
  };
  /*Esse é para buscar por id*/
UsuariosDAO.prototype.buscar = function (id, callback) {
    this._connection.query("select * from usuario where id_usuario = ?", id, callback);
  };
UsuariosDAO.prototype.salvar = function (usuario, callback) {
    this._connection.query('INSERT INTO usuario SET ?', usuario, callback);
};

UsuariosDAO.prototype.salvaalt = function(usuario, callback){
    this._connection.query("update usuario set cpf = ?, nome = ?, email = ?, endereco = ?, telefone = ? where id_usuario = ?", [usuario.cpf, usuario.nome,usuario.email,usuario.endereco, usuario.telefone, usuario.id], callback);
};
module.exports = function () {
    return UsuariosDAO;
};
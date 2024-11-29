var bcrypt = require('bcrypt');

// Módulo principal que contém as rotas para autenticação e gerenciamento de usuários
module.exports = function (app) {
    // Rota GET para exibir a página de login
    app.get('/login', function (req, res) {
        res.render('usuarios/login', { erro: null });
    });

    // Rota POST para processar o login do usuário
    app.post('/login', function (req, res) {
        var connection = app.infra.connectionFactory(); // Cria uma nova conexão com o banco de dados
        var usuariosDAO = new app.infra.UsuariosDAO(connection); // Instancia o DAO para acessar os dados de usuários
        var email = req.body.email; // Obtém o email do corpo da requisição
        var senha = req.body.senha; // Obtém a senha do corpo da requisição

        // Busca o usuário pelo email fornecido
        usuariosDAO.buscarPorEmail(email, function (err, results) {
            if (err) {
                return res.status(500).send('Erro ao buscar usuário'); // Retorna erro se houver falha na busca
            }
            if (results.length === 0) {
                return res.render('usuarios/login', { erro: 'Usuário não encontrado' }); // Retorna erro se usuário não for encontrado
            }

            var usuario = results[0]; // Pega o primeiro usuário retornado
            // Compara a senha fornecida com a senha armazenada no banco de dados
            bcrypt.compare(senha, usuario.senha, function (err, result) {
                if (result) {
                    req.session.usuario = usuario; // Salva o usuário na sessão
                    res.redirect('/'); // Redireciona para a página principal
                } else {
                    res.render('usuarios/login', { erro: 'Senha incorreta' }); // Retorna erro se a senha estiver incorreta
                }
            });
        });

        connection.end(); // Fecha a conexão com o banco de dados
    });

    // Rota GET para logout do usuário
    app.get('/logout', function (req, res) {
        req.session.destroy(); // Destroi a sessão do usuário
        res.redirect('/'); // Redireciona para a página principal
    });

    // Rota GET para exibir a página de registro
    app.get('/registro', function (req, res) {
        res.render('usuarios/registro', { errosValidacao: {}, usuario: {} }); // Renderiza a página de registro
    });
    
    // Rota POST para processar o registro do usuário
    app.post('/registro', function (req, res) {
        var connection = app.infra.connectionFactory(); // Cria uma nova conexão com o banco de dados
        var usuariosDAO = new app.infra.UsuariosDAO(connection); // Instancia o DAO para acesso aos dados
        var usuario = req.body; // Obtém os dados do usuário do corpo da requisição
        
        // Validação dos campos do formulário
        req.assert('nome', 'Nome é obrigatório!').notEmpty();
        req.assert('email', 'E-mail é obrigatório!').notEmpty();
        req.assert('cpf', 'CPF é obrigatório!').notEmpty();
        req.assert('endereco', 'Endereço é obrigatório!').notEmpty();
        req.assert('telefone', 'Telefone é obrigatório!').notEmpty();
        req.assert('senha', 'Senha é obrigatória!').notEmpty();

        var erros = req.validationErrors(); // Verifica se há erros de validação
        if (erros) {
            return res.render('usuarios/registro', { errosValidacao: erros, usuario: usuario }); // Retorna erros de validação se existirem
        }
        
        // Gera um hash da senha do usuário
        bcrypt.hash(usuario.senha, 10, function (err, hash) {
            usuario.senha = hash; // Atualiza a senha do usuário com o hash
            
            // Salva o usuário no banco de dados
            usuariosDAO.salvar(usuario, function (err, results) {
                if (err) {
                    return res.status(500).send('Erro ao salvar usuário'); // Retorna erro se falhar ao salvar
                }
                res.redirect('/login'); // Redireciona para a página de login após registro bem-sucedido
            });

            connection.end(); // Fecha a conexão com o banco de dados
        });
    });

    // Middleware de autenticação para proteger rotas
    function autenticacao(req, res, next) {
        if (!req.session.usuario) {
            return res.redirect('/login'); // Redireciona para a página de login se o usuário não estiver autenticado
        }
        next(); // Continua para a próxima função se o usuário estiver autenticado
    }

    // Rota GET para listar usuários logados, protegida por autenticação
    app.get("/usuarios", autenticacao, function (request, response, next) {
        var connection = app.infra.connectionFactory(); // Cria nova conexão com o banco de dados
        var usuariosBanco = new app.infra.UsuariosDAO(connection); // Instancia o DAO
        usuariosBanco.lista(function (err, results) {
            if (err) {
                return next(err); // Chama o próximo middleware em caso de erro
            }
            // Retorna a lista de usuários em formato HTML ou JSON
            response.format({
                html: function () {
                    response.render("usuarios/lista.ejs", { lista: results });
                },
                json: function () {
                    response.json(results);
                },
            });
        });
        connection.end(); // Fecha a conexão com o banco de dados
    });

    // Rota GET para editar os dados do usuário
    app.get("/editar/:id", function (request, response) {
        var id = request.params.id; // Obtém o ID do usuário a ser editado
        var connection = app.infra.connectionFactory(); // Cria nova conexão com o banco de dados
        var usuariosBanco = new app.infra.UsuariosDAO(connection); // Instancia o DAO
        usuariosBanco.buscar(id, function (err, results) {
            // Retorna os dados do usuário para edição em formato HTML ou JSON
            response.format({
                html: function () {
                    response.render("usuarios/formalt", { usuario: results });
                },
                json: function () {
                    response.json(results);
                },
            });
        });
        connection.end(); // Fecha a conexão com o banco de dados
    });

    // Rota POST para atualizar os dados do usuário
    app.post("/alteracao", function (request, response) {
        var usuario = request.body; // Obtém os dados do usuário do corpo da requisição

        // Validação dos campos do formulário
        request.assert('nome', 'Nome é obrigatório!').notEmpty();
        request.assert('email', 'E-mail é obrigatório!').notEmpty();
        request.assert('cpf', 'CPF é obrigatório!').notEmpty();
        request.assert('endereco', 'Endereço é obrigatório!').notEmpty();
        request.assert('telefone', 'Telefone é obrigatório!').notEmpty();
        
        var erros = request.validationErrors(); // Verifica se há erros de validação
        if (erros) {
            response.format({
                html: function () {
                    response.status(400).render('usuarios/formalt', { errosValidacao: erros, usuario: usuario }); // Retorna erros de validação se existirem
                },
                json: function () {
                    response.status(400).json(erros); // Retorna erros em formato JSON
                },
            });
            return;
        }

        var connection = app.infra.connectionFactory(); // Cria nova conexão com o banco de dados
        var usuariosBanco = new app.infra.UsuariosDAO(connection); // Instancia o DAO
        usuariosBanco.salvaalt(usuario, function (err, results) {
            response.redirect("/usuarios"); // Redireciona para a lista de usuários após a atualização
        });
        connection.end(); // Fecha a conexão com o banco de dados
    });
};

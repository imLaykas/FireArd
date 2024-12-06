var mysql = require("mysql");
var connectMYSQL = function () {
 if (!process.env.NODE_ENV) {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "teste_fireard",
    });
  }

  if(process.env.NODE_ENV == 'test'){
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "livraria",
    });
  }
};

module.exports = function () {
  return connectMYSQL;
};

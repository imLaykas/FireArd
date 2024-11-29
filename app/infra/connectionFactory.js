var mysql = require("mysql");
var connectMYSQL = function () {
 if (!process.env.NODE_ENV) {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "fireard",
    });
  }

  if(process.env.NODE_ENV == 'test'){
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "teste",
    });
  }
};

module.exports = function () {
  return connectMYSQL;
};

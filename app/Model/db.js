"user strict";

var mysql = require("../../node_modules/mysql");
const config = require("../../config/config.js");

//local mysql db connection
var connection = mysql.createConnection({
  host: "localhost",
  user: global.gConfig.user_database,
  password: global.gConfig.user_password,
  database: "riego"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;

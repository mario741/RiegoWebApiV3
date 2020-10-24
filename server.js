const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// environment variables
process.env.NODE_ENV = "development";
//process.env.NODE_ENV = "production";

const config = require("./config/config.js");

const mysql = require("mysql");
// connection configurations
const mc = mysql.createConnection({
  host: "localhost",
  user: global.gConfig.user_database,
  password: global.gConfig.user_password,
  database: "riego",
});

// connect to database
mc.connect();

app.listen(global.gConfig.node_port);

console.log("API server started on: " + global.gConfig.node_port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var routes = require("./routes");
routes(app); //register the route

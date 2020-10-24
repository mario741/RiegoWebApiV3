"user strict";
var sql = require("./db.js");

var RegistroTiempo = function (rt) {
  this.id = rt.id;
  this.estado = rt.estado;
  this.temperatura = rt.temperatura;
  this.humedad = rt.humedad;
  this.fecha = rt.fecha;
};

RegistroTiempo.create = function (rt, result) {
  sql.query(
    "INSERT INTO RegistroTiempo SET estado = ? , temperatura = ?, humedad = ?, fecha = ?",
    [rt.estado, rt.temperatura, rt.humedad, new Date()],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    }
  );
};

RegistroTiempo.getRain = function (result) {
  var mes = new Date().getMonth() + 1;
  var mesesCalidos = "1,2,3,9,10,11,12";
  var query = "";

  if (mesesCalidos.indexOf(mes.toString()) > -1) {
    query =
      "SELECT count(id) as lluvia FROM RegistroTiempo rt WHERE rt.fecha > DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL -12 HOUR) AND estado in ('Rain','Snow','Drizzle')";
  } else {
    query =
      "SELECT count(id) as lluvia FROM RegistroTiempo rt WHERE rt.fecha > DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL -2 DAY) AND estado in ('Rain','Snow','Drizzle')";
  }

  sql.query(query, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res[0].lluvia > 0);
    }
  });
};

module.exports = RegistroTiempo;

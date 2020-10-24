"user strict";
var sql = require("./db.js");

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

var Actividad = function (data) {
  this.id = data.id;
  this.configuracionId = data.configuracionId;
  this.fecha = data.fecha;
  this.realizada = data.realizada;
  this.nombreConfiguracion = data.nombreConfiguracion;
  this.comentario = data.comentario;
};

var tableName = "Actividades";

Actividad.create = function (actividad, result) {
  var docClient = new AWS.DynamoDB.DocumentClient();

  sql.query(
    "SELECT nombre FROM Configuracion WHERE id = ?",
    actividad.configuracionId,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        var params = {
          TableName: tableName,
          Item: {
            fecha: new Date().toISOString(),
            nombreConfiguracion: res[0].nombre,
            realizada: actividad.realizada,
            comentario: actividad.comentario ? actividad.comentario : "",
          },
        };

        docClient.put(params, function (err, data) {
          if (err) {
            console.error(
              "Error al guardar Actividad",
              actividad.realizada,
              ". Error JSON:",
              JSON.stringify(err, null, 2)
            );
          } else {
            result(null, res[0].nombre);
          }
        });
      }
    }
  );
};

Actividad.getByDate = function (filtro, result) {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: tableName,
    ProjectionExpression: "fecha, nombreConfiguracion, realizada",
    FilterExpression: "begins_with(fecha, :yyyymm)",
    ExpressionAttributeValues: {
      ":yyyymm": filtro,
    },
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
      result(null, err);
    } else {
      result(null, data.Items);
    }
  });
};

Actividad.remove = function (id, result) {
  sql.query("DELETE FROM Actividad WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Actividad;

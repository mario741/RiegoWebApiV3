"user strict";
var sql = require("./db.js");

//TipoRiego object constructor
var TipoRiego = function (tr) {
  this.id = tr.id;
  this.nombre = tr.nombre;
  this.fecha_creacion = tr.fecha_creacion;
  this.fecha_modificacion = tr.fecha_modificacion;
  this.estado = tr.estado;
};

TipoRiego.create = function (tipoRiego, result) {
  sql.query(
    "INSERT INTO TipoRiego SET nombre = ?, fechaCreacion = ?, estado = ?",
    [tipoRiego.nombre, new Date(), tipoRiego.estado],
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

TipoRiego.getById = function (id, result) {
  sql.query(
    "SELECT * FROM TipoRiego WHERE id = ? AND estado != 2",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

TipoRiego.getAll = function (result) {
  sql.query(
    "SELECT id, nombre, DATE_FORMAT(fecha_creacion,'%d/%m/%Y %k:%i') as fecha_creacion, DATE_FORMAT(fecha_modificacion,'%d/%m/%Y %k:%i') as fecha_modificacion, estado FROM TipoRiego WHERE estado != 2",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

TipoRiego.update = function (id, tipoRiego, result) {
  sql.query(
    "UPDATE TipoRiego SET nombre = ?, estado = ?, fechaModificacion = ? WHERE id = ?",
    [tipoRiego.nombre, tipoRiego.estado, new Date(), id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

TipoRiego.remove = function (id, result) {
  sql.query(
    "UPDATE TipoRiego SET estado = ?, fechaModificacion = ? WHERE id = ?",
    [2, new Date(), id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = TipoRiego;

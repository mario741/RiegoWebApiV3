"user strict";
var sql = require("./db.js");

//ParametroSistema object constructor
var ParametroSistema = function (ps) {
  this.id = ps.id;
  this.nombre = ps.nombre;
  this.valor = ps.valor;
  this.descripcion = ps.descripcion;
  this.estado = ps.estado;
  this.fechaCreacion = ps.fechaCreacion;
  this.fechaModificacion = ps.fechaModificacion;
};

ParametroSistema.create = function (ps, result) {
  sql.query(
    "INSERT INTO ParametroSistema SET nombre = ?, valor = ?, descripcion = ?, estado = ?, fechaCreacion = ?",
    [ps.nombre, ps.valor, ps.descripcion, ps.estado, new Date()],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

ParametroSistema.getById = function (id, result) {
  sql.query(
    "SELECT id, nombre, valor, DATE_FORMAT(fechaCreacion,'%d/%m/%Y %k:%i') as fechaCreacion, DATE_FORMAT(fechaModificacion,'%d/%m/%Y %k:%i') as fechaModificacion, estado, descripcion FROM ParametroSistema WHERE id = ? AND estado != 2",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};

ParametroSistema.getByName = function (nombre, result) {
  sql.query(
    "SELECT id, nombre, valor, DATE_FORMAT(fechaCreacion,'%d/%m/%Y %k:%i') as fechaCreacion, DATE_FORMAT(fechaModificacion,'%d/%m/%Y %k:%i') as fechaModificacion, estado, descripcion FROM ParametroSistema WHERE nombre = ? AND estado != 2 LIMIT 1",
    nombre,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};

ParametroSistema.getAll = function (result) {
  sql.query(
    "SELECT id, nombre, valor, DATE_FORMAT(fechaCreacion,'%d/%m/%Y %k:%i') as fechaCreacion, DATE_FORMAT(fechaModificacion,'%d/%m/%Y %k:%i') as fechaModificacion, estado FROM ParametroSistema WHERE estado != 2",
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

ParametroSistema.update = function (id, ps, result) {
  sql.query(
    "UPDATE ParametroSistema SET nombre = ?, valor = ?, descripcion = ?, estado = ? , fechaModificacion = ? WHERE id = ?",
    [ps.nombre, ps.valor, ps.descripcion, ps.estado, new Date(), id],
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

ParametroSistema.remove = function (id, result) {
  sql.query(
    "UPDATE ParametroSistema SET estado = ? , fechaModificacion = ? WHERE id = ?",
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

module.exports = ParametroSistema;

"user strict";
var sql = require("./db.js");

var Configuracion = function (data) {
  this.id = data.id;
  this.nombre = data.nombre;
  this.tipoRiegoId = data.tipoRiegoId;
  this.horaInicio = data.horaInicio;
  this.horaTermino = data.horaTermino;
  this.fechaCreacion = data.fechaCreacion;
  this.fechaModificacion = data.fechaModificacion;
  this.estado = data.estado;
  this.tipoRiego = data.tipoRiego;
  this.dias = data.dias;
};

Configuracion.create = function (data, result) {
  sql.query(
    "INSERT INTO Configuracion SET nombre = ? , tipoRiegoId = ?, horaInicio = ?, horaTermino = ?, fechaCreacion = ?, estado = ?, dias = ?",
    [
      data.nombre,
      data.tipoRiegoId,
      data.horaInicio,
      data.horaTermino,
      new Date(),
      data.estado,
      data.dias,
    ],
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

Configuracion.getById = function (id, result) {
  sql.query(
    "SELECT c.id, c.tipoRiegoId, c.nombre, c.horaInicio, c.horaTermino, c.fechaCreacion, c.fechaModificacion, c.estado, tr.nombre as nombreTipoRiego, c.dias FROM Configuracion c INNER JOIN TipoRiego tr ON c.tipoRiegoId = tr.id WHERE c.id = ? AND c.estado != 2",
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

Configuracion.getAll = function (result) {
  sql.query(
    "SELECT c.id, c.tipoRiegoId, c.nombre, c.horaInicio, c.horaTermino, c.fechaCreacion, c.fechaModificacion, c.estado, tr.nombre as nombreTipoRiego, c.dias FROM Configuracion c INNER JOIN TipoRiego tr ON c.tipoRiegoId = tr.id WHERE c.estado != 2",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("tasks : ", res);
        result(null, res);
      }
    }
  );
};

Configuracion.update = function (id, data, result) {
  sql.query(
    "UPDATE Configuracion SET nombre = ? , tipoRiegoId = ?, horaInicio = ?, horaTermino = ?, fechaModificacion = ?, estado = ?, dias = ? WHERE id = ?",
    [
      data.nombre,
      data.tipoRiegoId,
      data.horaInicio,
      data.horaTermino,
      new Date(),
      data.estado,
      data.dias,
      id,
    ],
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

Configuracion.remove = function (id, result) {
  sql.query(
    "UPDATE Configuracion SET estado = ?, fechaModificacion = ? WHERE id = ?",
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

Configuracion.getActivas = function (result) {
  sql.query(
    "SELECT c.id, c.tipoRiegoId, c.nombre, c.horaInicio, c.horaTermino, tr.nombre as nombreTipoRiego, c.dias, TIMESTAMPDIFF(SECOND, horaInicio, horaTermino) * 1000 as duracion FROM Configuracion c INNER JOIN TipoRiego tr ON c.tipoRiegoId = tr.id WHERE c.estado = 1",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("tasks : ", res);
        result(null, res);
      }
    }
  );
};

module.exports = Configuracion;

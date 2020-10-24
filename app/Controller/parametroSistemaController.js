"use strict";

var ParametroSistemaModel = require("../model/parametroSistema");

exports.get = function (req, res) {
  ParametroSistemaModel.getAll(function (err, task) {
    if (err) res.send(err);
    res.send(task);
  });
};

exports.create = function (req, res) {
  var nuevoParametroSistema = new ParametroSistemaModel(req.body);

  if (!nuevoParametroSistema.nombre || !nuevoParametroSistema.valor) {
    res
      .status(400)
      .send({ error: true, message: "Faltan campos obligatorios" });
  } else {
    ParametroSistemaModel.create(nuevoParametroSistema, function (
      err,
      configuracion
    ) {
      if (err) res.send(err);
      res.json(configuracion);
    });
  }
};

exports.getById = function (req, res) {
  ParametroSistemaModel.getById(req.params.id, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.getByName = function (req, res) {
  ParametroSistemaModel.getByName(req.params.name, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update = function (req, res) {
  ParametroSistemaModel.update(
    req.params.id,
    new ParametroSistemaModel(req.body),
    function (err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete = function (req, res) {
  ParametroSistemaModel.remove(req.params.id, function (err, task) {
    if (err) res.send(err);
    res.json({ message: "Parametro sistema eliminado" });
  });
};

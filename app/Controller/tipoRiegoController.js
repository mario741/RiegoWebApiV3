"use strict";

var TipoRiegoModel = require("../model/tipoRiegoModel");

exports.get = function (req, res) {
  TipoRiegoModel.getAll(function (err, task) {
    if (err) res.send(err);
    res.send(task);
  });
};

exports.create = function (req, res) {
  var nuevoTipoRiego = new TipoRiegoModel(req.body);

  //handles null error
  if (!nuevoTipoRiego.nombre) {
    res.status(400).send({ error: true, message: "Nombre es obligatorio" });
  } else {
    TipoRiegoModel.create(nuevoTipoRiego, function (err, tipoRiego) {
      if (err) res.send(err);
      res.json(tipoRiego);
    });
  }
};

exports.getById = function (req, res) {
  TipoRiegoModel.getById(req.params.id, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update = function (req, res) {
  TipoRiegoModel.update(req.params.id, new TipoRiegoModel(req.body), function (
    err,
    task
  ) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.delete = function (req, res) {
  TipoRiegoModel.remove(req.params.id, function (err, task) {
    if (err) res.send(err);
    res.json({ message: "Tipo riego eliminado" });
  });
};

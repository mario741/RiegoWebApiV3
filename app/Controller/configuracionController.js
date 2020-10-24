"use strict";

var ConfiguracionModel = require("../model/configuracionModel");

exports.get = function (req, res) {
  ConfiguracionModel.getAll(function (err, task) {
    if (err) res.send(err);
    res.send(task);
  });
};

exports.create = function (req, res) {
  var nuevaConfiguracion = new ConfiguracionModel(req.body);

  //handles null error
  if (
    !nuevaConfiguracion.nombre ||
    !nuevaConfiguracion.tipoRiegoId ||
    !nuevaConfiguracion.horaInicio ||
    !nuevaConfiguracion.horaTermino
  ) {
    res
      .status(400)
      .send({ error: true, message: "Faltan campos obligatorios" });
  } else {
    ConfiguracionModel.create(nuevaConfiguracion, function (
      err,
      configuracion
    ) {
      if (err) res.send(err);
      res.json(configuracion);
    });
  }
};

exports.getById = function (req, res) {
  ConfiguracionModel.getById(req.params.id, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update = function (req, res) {
  ConfiguracionModel.update(
    req.params.id,
    new ConfiguracionModel(req.body),
    function (err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete = function (req, res) {
  ConfiguracionModel.remove(req.params.id, function (err, task) {
    if (err) res.send(err);
    res.json({ message: "Configuracion eliminada" });
  });
};

exports.getActivas = function (req, res) {
  ConfiguracionModel.getActivas(function (err, task) {
    if (err) res.send(err);
    console.log("res", task);
    res.send(task);
  });
};

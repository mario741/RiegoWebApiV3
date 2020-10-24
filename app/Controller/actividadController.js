"use strict";

var ActividadModel = require("../model/actividadModel");

exports.create = function (req, res) {
  var nuevaActividad = new ActividadModel(req.body);

  if (!nuevaActividad.configuracionId) {
    res
      .status(400)
      .send({ error: true, message: "Faltan campos obligatorios" });
  } else {
    ActividadModel.create(nuevaActividad, function (err, configuracion) {
      if (err) res.send(err);
      res.json(configuracion);
    });
  }
};

exports.get = function (req, res) {
  ActividadModel.getByDate(req.params.fecha, function (err, task) {
    if (err) res.send(err);
    res.send(task);
  });
};

"use strict";

var RegistroTiempoModel = require("../model/registroTiempoModel");

exports.create = function (req, res) {
  var nuevoRegistro = new RegistroTiempoModel(req.body);

  if (
    !nuevoRegistro.estado ||
    !nuevoRegistro.temperatura ||
    !nuevoRegistro.humedad
  ) {
    res
      .status(400)
      .send({ error: true, message: "Faltan campos obligatorios" });
  } else {
    RegistroTiempoModel.create(nuevoRegistro, function (err, registroTiempo) {
      if (err) res.send(err);
      res.json(registroTiempo);
    });
  }
};

exports.getRain = function (req, res) {
  RegistroTiempoModel.getRain(function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

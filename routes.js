"use strict";
module.exports = function (app) {
  var tipoRiegoController = require("./app/controller/tipoRiegoController");
  var configuracionController = require("./app/controller/configuracionController");
  var actividadController = require("./app/controller/actividadController");
  var parametroSistemaController = require("./app/controller/parametroSistemaController");
  var registroTiempoController = require("./app/controller/registroTiempoController");

  app
    .route("/tipoRiego")
    .get(tipoRiegoController.get)
    .post(tipoRiegoController.create);

  app
    .route("/tipoRiego/:id")
    .get(tipoRiegoController.getById)
    .put(tipoRiegoController.update)
    .delete(tipoRiegoController.delete);

  app
    .route("/configuracion")
    .get(configuracionController.get)
    .post(configuracionController.create);

  app.route("/configuracion/activas").get(configuracionController.getActivas);

  app
    .route("/configuracion/:id")
    .get(configuracionController.getById)
    .put(configuracionController.update)
    .delete(configuracionController.delete);

  app.route("/actividad").post(actividadController.create);

  app.route("/actividad/:fecha").get(actividadController.get);

  app
    .route("/parametroSistema")
    .get(parametroSistemaController.get)
    .post(parametroSistemaController.create);

  app
    .route("/parametroSistema/:id")
    .get(parametroSistemaController.getById)
    .put(parametroSistemaController.update)
    .delete(parametroSistemaController.delete);

  app
    .route("/parametroSistema/name/:name")
    .get(parametroSistemaController.getByName);

  app.route("/registroTiempo").post(registroTiempoController.create);

  app.route("/registroTiempo/lluvia").get(registroTiempoController.getRain);
};

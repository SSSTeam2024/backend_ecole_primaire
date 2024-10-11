const express = require("express");
const observationController = require("../../controllers/observationControllers/observationControllers");

const router = express.Router();

router.post("/newObservation", observationController.createObservation);
router.get("/getObservations", observationController.getObservations);
router.delete(
  "/deleteObservation/:id",
  observationController.deleteObservation
);
router.get(
  "/observations-classe-id/:id",
  observationController.getObservationByClasseId
);
router.patch("/updateObservation/:id", observationController.updateObservation);
module.exports = router;

const express = require("express");
const observationController = require("../../controllers/observationControllers/observationControllers");

const router = express.Router();

router.post("/newObservation", observationController.createObservation);
router.get("/getObservations", observationController.getObservations);
router.delete(
  "/deleteObservation/:id",
  observationController.deleteObservation
);

module.exports = router;

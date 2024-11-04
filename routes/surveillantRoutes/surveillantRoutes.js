const express = require("express");
const surveillantControllers = require("../../controllers/surveillantControllers/surveillantControllers");

const router = express.Router();

router.post("/createSurveillant", surveillantControllers.createSurveillant);
router.get("/getSurveillants", surveillantControllers.getSurveillants);
router.patch(
  "/updateSurveillant/:id",
  surveillantControllers.updateSurveillant
);
router.delete(
  "/deleteSurveillant/:id",
  surveillantControllers.deleteSurveillant
);

module.exports = router;

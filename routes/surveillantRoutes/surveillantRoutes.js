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
router.post("/login", surveillantControllers.login);
router.post("/logout/:id", surveillantControllers.logout);
router.post(
  "/getSurveillantByJwtToken",
  surveillantControllers.getSurveillantByJwtToken
);
router.get(
  "/getSurveillantById/:id",
  surveillantControllers.getSurveillantById
);

module.exports = router;

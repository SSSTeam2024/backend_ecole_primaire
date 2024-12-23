const express = require("express");
const carnetController = require("../../controllers/carnetControllers/carnetControllers");

const router = express.Router();

router.post("/newCarnet", carnetController.createCarnet);
router.get("/getCarnets", carnetController.getCarnets);
router.patch("/updateCarnet/:id", carnetController.updateCarnet);
router.delete("/deleteCarnet/:id", carnetController.deleteCarnet);
router.get("/carnet-eleve-id/:id", carnetController.getCarnetsByEleveId);

module.exports = router;

const express = require("express");
const carnetController = require("../../controllers/carnetControllers/carnetControllers");

const router = express.Router();

router.post("/newCarnet", carnetController.createCarnet);
router.get("/getCarnets", carnetController.getCarnets);
// router.patch("/updateEtudiant/:id", carnetController.updateEtudiant);
// router.delete("/deleteEtudiant/:id", carnetController.deleteEtudiant);
module.exports = router;

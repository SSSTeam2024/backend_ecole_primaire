const express = require("express");
const compteRenduController = require("../../controllers/compteRenduControllers/compteRenduControllers");

const router = express.Router();

router.post("/newCompteRendu", compteRenduController.createCompteRendu);
router.get("/getCompteRendus", compteRenduController.getCompteRendus);
// router.patch("/updateMatiere/:id", compteRenduController.updateMatiere);
router.delete(
  "/deleteCompteRendu/:id",
  compteRenduController.deleteCompteRendu
);
router.get(
  "/compteRendu-classe-id/:id",
  compteRenduController.getCompteRendusByClasseId
);

module.exports = router;

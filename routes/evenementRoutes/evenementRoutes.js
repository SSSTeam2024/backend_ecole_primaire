const express = require("express");
const evenementController = require("../../controllers/evenementControllers/evenementControllers");

const router = express.Router();

router.post("/newEvenement", evenementController.createEvenement);
router.get("/getEvenement", evenementController.getEvenements);
// router.patch("/updateMatiere/:id", noteController.updateMatiere);
router.delete("/deleteEvenement/:id", evenementController.deleteEvenement);
router.get(
  "/evenement-classe-id/:id",
  evenementController.getEvenementsByClasseId
);

module.exports = router;

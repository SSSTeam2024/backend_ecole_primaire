const express = require("express");
const emploiController = require("../../controllers/emploiControllers/emploiControllers");

const router = express.Router();

router.post("/newEmploi", emploiController.createEmploi);
router.get("/getEmplois", emploiController.getEmplois);
// router.patch("/updateEtudiant/:id", etudiantController.updateEtudiant);
// router.delete("/deleteEtudiant/:id", etudiantController.deleteEtudiant);
module.exports = router;

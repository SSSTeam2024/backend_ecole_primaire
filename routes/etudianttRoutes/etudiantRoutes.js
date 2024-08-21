const express = require("express");
const etudiantController = require("../../controllers/etudiantsControllers/etudiantsControllers");

const router = express.Router();

router.post("/newEtudiant", etudiantController.createEtudiant);
router.get("/getEtudiants", etudiantController.getEtudiants);
router.patch("/updateEtudiant/:id", etudiantController.updateEtudiant);
router.delete("/deleteEtudiant/:id", etudiantController.deleteEtudiant);
module.exports = router;

const express = require("express");
const etudiantController = require("../../controllers/etudiantsControllers/etudiantsControllers");

const router = express.Router();

router.post("/newEtudiant", etudiantController.createEtudiant);
router.get("/getEtudiants", etudiantController.getEtudiants);
router.patch("/updateEtudiant/:id", etudiantController.updateEtudiant);
router.delete("/deleteEtudiant/:id", etudiantController.deleteEtudiant);
router.get(
  "/etudiants-classe-id/:id",
  etudiantController.getEtudiantsByClasseId
);
router.post("/updateStatusPaiment", etudiantController.updateStatusPaiment);
router.post("/updateEleveClasse", etudiantController.updateEleveClasse);
module.exports = router;

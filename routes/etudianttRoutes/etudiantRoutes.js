const express = require("express");
const etudiantController = require("../../controllers/etudiantsControllers/etudiantsControllers");

const router = express.Router();

router.post("/newEtudiant", etudiantController.createEtudiant);
router.get("/getEtudiants", etudiantController.getEtudiants);
// router.get("/getDefectById/:id", etudiantController.getDefectById);
router.delete("/deleteEtudiant/:id", etudiantController.deleteEtudiant);
// router.patch("/updateDefect/:id", etudiantController.updateDefect);
module.exports = router;

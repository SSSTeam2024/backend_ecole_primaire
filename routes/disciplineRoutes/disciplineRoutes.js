const express = require("express");
const disciplineController = require("../../controllers/disciplineControllers/disciplineControllers");

const router = express.Router();

router.post("/newDiscipline", disciplineController.createDiscipline);
router.get("/getDisciplines", disciplineController.getDisciplines);
// router.patch("/updateEtudiant/:id", etudiantController.updateEtudiant);
router.delete("/deleteDiscipline/:id", disciplineController.deleteDiscipline);
router.get(
  "/discipline-eleve-id/:id",
  disciplineController.getDisciplinesByEleveId
);

module.exports = router;

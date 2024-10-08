const express = require("express");
const exerciceController = require("../../controllers/exerciceControllers/exerciceControllers");

const router = express.Router();

router.post("/newExercice", exerciceController.createExercice);
router.get("/getExercices", exerciceController.getExercices);
// router.patch("/updateEtudiant/:id", etudiantController.updateEtudiant);
router.delete("/deleteExercice/:id", exerciceController.deleteExercice);
router.get(
  "/exercice-classe-id/:id",
  exerciceController.getExercicesByClasseId
);

module.exports = router;

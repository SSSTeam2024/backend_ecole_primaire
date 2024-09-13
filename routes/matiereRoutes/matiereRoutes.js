const express = require("express");
const matiereController = require("../../controllers/matiereControllers/matiereControllers");

const router = express.Router();

router.post("/newMatiere", matiereController.createMatiere);
router.get("/getMatieres", matiereController.getMatieres);
router.patch("/updateMatiere/:id", matiereController.updateMatiere);
router.delete("/deleteMatiere/:id", matiereController.deleteMatiere);
router.get(
  "/getMatieresByClasse/:classeId",
  matiereController.getMatieresByClasseId
);
router.get(
  "/getMatieresByEtudiant/:etudiantId",
  matiereController.getMatieresByEtudiantId
);

module.exports = router;

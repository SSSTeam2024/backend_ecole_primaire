const express = require("express");
const classeController = require("../../controllers/classeControllers/classeControllers");

const router = express.Router();

router.post("/newClasse", classeController.createClasse);
router.get("/getClasses", classeController.getClasses);
// router.get("/getDefectById/:id", etudiantController.getDefectById);
// router.delete("/deleteEtudiant/:id", etudiantController.deleteEtudiant);
// router.patch("/updateDefect/:id", etudiantController.updateDefect);
module.exports = router;

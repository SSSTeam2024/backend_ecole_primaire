const express = require("express");
const enseignantController = require("../../controllers/enseignantControllers/enseignantControllers");

const router = express.Router();

router.post("/newEnseignant", enseignantController.createEnseignant);
router.get("/getEnseignants", enseignantController.getEnseignants);

module.exports = router;

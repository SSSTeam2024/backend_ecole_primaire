const express = require("express");
const niveauControllers = require("../../controllers/niveauControllers/niveauControllers");

const router = express.Router();

router.post("/createNiveau", niveauControllers.createNiveau);
router.get("/getNiveaux", niveauControllers.getNiveaux);
router.patch("/updateNiveau/:id", niveauControllers.updateNiveau);
router.delete("/deleteNiveau/:id", niveauControllers.deleteNiveau);

module.exports = router;

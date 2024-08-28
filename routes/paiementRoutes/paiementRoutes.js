const express = require("express");
const paiementControllers = require("../../controllers/paiementControllers/paiementControllers");

const router = express.Router();

router.post("/createPaiement", paiementControllers.createPaiement);
router.get("/getPaiements", paiementControllers.getPaiements);
router.delete("/deletePaiement/:id", paiementControllers.deletePaiement);
router.get("/paiement-eleve-id/:id", paiementControllers.getPaiementByEleveId);
router.patch("/updatePaiement/:id", paiementControllers.updatePaiement);

module.exports = router;

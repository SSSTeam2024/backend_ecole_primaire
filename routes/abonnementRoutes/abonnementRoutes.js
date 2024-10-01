const express = require("express");
const abonnementControllers = require("../../controllers/abonnementControllers/abonnementControllers");

const router = express.Router();

router.post("/createAbonnement", abonnementControllers.createAbonnement);
router.get("/getAbonnements", abonnementControllers.getAbonnements);
router.patch("/updateAbonnement/:id", abonnementControllers.updateAbonnement);
router.delete("/deleteAbonnement/:id", abonnementControllers.deleteAbonnement);
router.get(
  "/abonnements-eleve-id/:id",
  abonnementControllers.getAbonnementsByEleveId
);
module.exports = router;

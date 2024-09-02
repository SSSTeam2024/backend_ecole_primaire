const express = require("express");
const inscriptionController = require("../../controllers/inscriptionControllers/inscriptionControllers");

const router = express.Router();

router.post("/createInscription", inscriptionController.createInscription);
router.get("/getInscriptions", inscriptionController.getInscriptions);
router.patch("/updateInscription/:id", inscriptionController.updateInscription);
router.delete(
  "/deleteInscription/:id",
  inscriptionController.deleteInscription
);
router.post(
  "/updateInscriptionStatus",
  inscriptionController.updateInscriptionStatus
);

module.exports = router;

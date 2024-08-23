const express = require("express");
const avisController = require("../../controllers/avisControllers/avisControllers");

const router = express.Router();

router.post("/newAvis", avisController.createAvis);
router.get("/getAvis", avisController.getAvis);
// router.patch("/updateMatiere/:id", noteController.updateMatiere);
router.delete("/deleteAvis/:id", avisController.deleteAvis);
router.get("/avis-classe-id/:id", avisController.getAvisByClasseId);

module.exports = router;

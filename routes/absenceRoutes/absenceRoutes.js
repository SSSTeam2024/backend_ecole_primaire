const express = require("express");
const absenceController = require("../../controllers/absenceControllers/absenceControllers");

const router = express.Router();

router.post("/newAbsence", absenceController.createAbsence);
router.get("/getAbsences", absenceController.getAbsences);
// router.patch("/updateMatiere/:id", noteController.updateMatiere);
router.delete("/deleteAbsence/:id", absenceController.deleteAbsence);

module.exports = router;

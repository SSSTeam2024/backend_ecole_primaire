const express = require("express");
const absenceController = require("../../controllers/absenceControllers/absenceControllers");

const router = express.Router();

router.post("/newAbsence", absenceController.createAbsence);
router.get("/getAbsences", absenceController.getAbsences);
router.patch("/updateAbsence/:id", absenceController.updateAbsence);
router.delete("/deleteAbsence/:id", absenceController.deleteAbsence);
router.get("/absence-eleve-id/:id", absenceController.getAbsencesByEleveId);

module.exports = router;

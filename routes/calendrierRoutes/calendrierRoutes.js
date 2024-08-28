const express = require("express");
const calendrierControllers = require("../../controllers/calendrierControllers/calendrierControllers");

const router = express.Router();

router.post("/createCalendrier", calendrierControllers.createCalendrier);
router.get("/getCalendriers", calendrierControllers.getCalendriers);
router.patch("/updateCalendrier/:id", calendrierControllers.updateCalendrier);
router.delete("/deleteCalendrier/:id", calendrierControllers.deleteCalendrier);
router.get(
  "/calendrier-classe-id/:id",
  calendrierControllers.getCalendriersByClasseId
);

module.exports = router;

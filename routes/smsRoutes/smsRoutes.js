const express = require("express");
const smsControllers = require("../../controllers/smsControllers/smsControllers");

const router = express.Router();

router.post("/createSms", smsControllers.createSms);
router.get("/getSms", smsControllers.getSms);
router.patch("/updateSms/:id", smsControllers.updateSms);
router.delete("/deleteSms/:id", smsControllers.deleteSms);
router.post("/send-pending-smses", smsControllers.sendPendingSmses);
router.delete("/delete-pending-smses", smsControllers.deletePendingSms);

module.exports = router;

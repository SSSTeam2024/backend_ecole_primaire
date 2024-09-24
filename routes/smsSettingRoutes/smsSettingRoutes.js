const express = require("express");
const smsSettingControllers = require("../../controllers/smsSettingControllers/smsSettingControllers");

const router = express.Router();

router.post("/createSmsSetting", smsSettingControllers.createSmsSetting);
router.get("/getSmsSettings", smsSettingControllers.getSmsSettings);
router.post("/updateSmsSetting", smsSettingControllers.updateSmsSetting);
router.patch(
  "/updateSmsSettingById",
  smsSettingControllers.updateSmsSettingById
);

module.exports = router;

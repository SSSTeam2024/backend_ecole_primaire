const express = require("express");
const notificationController = require("../../controllers/notificationController/notificationController");

const router = express.Router();

router.post("/sendNotification", notificationController.sendNotification);

module.exports = router;

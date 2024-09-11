const express = require("express");
const notificationController = require("../../controllers/notificationControllers/notificationControllers");

const router = express.Router();

// router.post("/sendNotification", notificationController.sendNotification);
router.post("/createNotification", notificationController.createNotification);
router.get("/getNotifications", notificationController.getNotifications);
router.patch(
  "/updateNotification/:id",
  notificationController.updateNotification
);
router.delete(
  "/deleteNotification/:id",
  notificationController.deleteNotification
);
router.get(
  "/notification-eleve-id/:id",
  notificationController.getNotificationsByEleveId
);

router.post(
  "/updateNotificationStatus",
  notificationController.updateNotificationStatus
);

module.exports = router;

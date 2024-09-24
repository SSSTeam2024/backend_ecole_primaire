const Notification = require("../../models/notificationModel/notificationModel");

const createNotification = async (notificationData) => {
  return await Notification.create(notificationData);
};

const getNotifications = async () => {
  return await Notification.find().populate("eleve");
};

const updateNotification = async (id, updateData) => {
  return await Notification.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNotification = async (id) => {
  return await Notification.findByIdAndDelete(id);
};

const getNotificationsByEleveId = async (eleveId) => {
  const query = {
    "eleve.id": eleveId,
  };
  return await Notification.find(query).populate("eleve.id");
};

const updateNotificationStatus = async (id, statusNotification) => {
  return await Notification.findOneAndUpdate(
    { "eleve.id": id },
    { $set: { "eleve.$.notif_status": statusNotification } },
    { new: true }
  ).populate("eleve.id");
};

module.exports = {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
  getNotificationsByEleveId,
  updateNotificationStatus,
};

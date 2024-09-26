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

const deleteEleveFromNotification = async (notificationId, eleveId) => {
  return await Notification.findByIdAndUpdate(
    notificationId, // The ID of the Notification document
    { $pull: { eleve: { id: eleveId } } }, // Removes the eleve with matching id from the array
    { new: true } // Return the updated document after deletion
  ).populate("eleve.id"); // Populate the remaining eleve.id references
};

const getNotificationsByEleveId = async (eleveId) => {
  const query = {
    "eleve.id": eleveId,
  };
  return await Notification.find(query).populate("eleve.id");
};

const updateNotificationStatus = async (
  student_id,
  statusNotification,
  notification_id
) => {
  return await Notification.findOneAndUpdate(
    { "eleve.id": student_id, _id: notification_id },
    { $set: { "eleve.$.notif_status": statusNotification } },
    { new: true }
  ).populate("eleve.id");
};

const getNotificationById = async (id) => {
  return await Notification.findById(id).populate("eleve.id");
};

module.exports = {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
  getNotificationsByEleveId,
  updateNotificationStatus,
  getNotificationById,
  deleteEleveFromNotification,
};

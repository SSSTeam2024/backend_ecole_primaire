const notificationService = require("../../services/notificationServices/notificationService");

const createNotification = async (req, res) => {
  try {
    const { eleve, lu, titre, description } = req.body;
    const newNotification = await notificationService.createNotification({
      eleve,
      lu,
      titre,
      description,
    });
    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications();
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { eleve, lu } = req.body;

    const updateNotification = await notificationService.updateNotification(
      notificationId,
      {
        eleve,
        lu,
      }
    );

    if (!updateNotification) {
      return res.status(404).send("Notification not found");
    }
    res.json(updateNotification);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const deletedNotification = await notificationService.deleteNotification(
      notificationId
    );

    if (!deletedNotification) {
      return res.status(404).send("Notification not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteEleveFromNotification = async (req, res) => {
  try {
    const { notificationId, eleveId } = req.body;

    const deletedNotification =
      await notificationService.deleteEleveFromNotification(
        notificationId,
        eleveId
      );

    if (!deletedNotification) {
      return res.status(404).send("Notification not found");
    }
    res.json({ message: "Notification deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNotificationsByEleveId = async (req, res) => {
  try {
    const { id: eleveId } = req.params;
    const notification = await notificationService.getNotificationsByEleveId(
      eleveId
    );
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateNotificationStatus = async (req, res) => {
  try {
    const { id_eleve, lu, id_notif } = req.body;
    const sentResult = await notificationService.updateNotificationStatus({
      student_id: id_eleve,
      statusNotification: lu,
      notification_id: id_notif,
    });
    res.json({ success: sentResult });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNoticiationById = async (req, res) => {
  try {
    const notification = req.params.id;

    const getNoticiation = await notificationService.getNotificationById(
      notification
    );

    if (!getNoticiation) {
      return res.status(404).send("Noticiation not found");
    }
    res.json(getNoticiation);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
  getNotificationsByEleveId,
  updateNotificationStatus,
  getNoticiationById,
  deleteEleveFromNotification,
};

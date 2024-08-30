const notificationService = require("../../services/notificationServices/notificationService");

const sendNotification = async (req, res) => {
  try {
    const { title, body } = req.body;
    const notificationData = { title, body };
    const response = await notificationService.sendNotification(
      notificationData
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  sendNotification,
};

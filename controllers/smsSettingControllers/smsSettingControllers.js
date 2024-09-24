const smsSettingServices = require("../../services/smsSettingServices/smsSettingServices");

const createSmsSetting = async (req, res) => {
  try {
    const { service_name, sms_status } = req.body;
    const newSmsSetting = await smsSettingServices.createSmsSetting({
      service_name,
      sms_status,
    });
    res.status(201).json(newSmsSetting);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getSmsSettings = async (req, res) => {
  try {
    const smsSettings = await smsSettingServices.getSmsSettings();
    res.json(smsSettings);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateSmsSetting = async (req, res) => {
  try {
    const updateData = req.body;
    const updateSmsSetting = await smsSettingServices.updateSmsSetting(
      updateData
    );

    if (!updateSmsSetting) {
      return res.status(404).send("Sms Setting not found");
    }
    res.json(updateSmsSetting);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateSmsSettingById = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log(req.body);
    const updateSmsSetting = await smsSettingServices.updateSmsSettingById({
      id,
      status,
    });

    if (!updateSmsSetting) {
      return res.status(404).send("Sms Setting not found");
    }
    res.json(updateSmsSetting);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createSmsSetting,
  getSmsSettings,
  updateSmsSetting,
  updateSmsSettingById,
};

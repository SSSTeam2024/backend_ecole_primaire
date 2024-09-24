const smsSettingDao = require("../../dao/smsSettingDao/smsSettingDao");

const createSmsSetting = async (salleData) => {
  return await smsSettingDao.createSmsSetting(salleData);
};

const getSmsSettings = async () => {
  return await smsSettingDao.getSmsSettings();
};

const updateSmsSetting = async (updateData) => {
  for (const smsSetting of updateData) {
    await smsSettingDao.updateSmsSetting(smsSetting.id, smsSetting.status);
  }
  return "Status Updated with success";
};

const updateSmsSettingById = async (updateData) => {
  const id = updateData.id;
  const status = updateData.status;
  const updatedSmsSetting = await smsSettingDao.updateSmsSetting(id, status);

  return updatedSmsSetting;
};

module.exports = {
  createSmsSetting,
  getSmsSettings,
  updateSmsSetting,
  updateSmsSettingById,
};

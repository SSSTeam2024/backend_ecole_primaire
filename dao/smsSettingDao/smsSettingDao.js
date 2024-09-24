const SmsSetting = require("../../models/smsSettingModel/smsSettingModel");

const createSmsSetting = async (smsSettingData) => {
  return await SmsSetting.create(smsSettingData);
};

const getSmsSettings = async () => {
  return await SmsSetting.find();
};

const updateSmsSetting = async (id, status) => {
  return await SmsSetting.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        sms_status: status,
      },
    }
  );
};

module.exports = {
  createSmsSetting,
  getSmsSettings,
  updateSmsSetting,
};

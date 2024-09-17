const Sms = require("../../models/smsModel/smsModel");

const createSms = async (SmsData) => {
  return await Sms.create(SmsData);
};

const getSms = async () => {
  return await Sms.find().populate("receiver");
};

const getPendingSmses = async () => {
  const query = {
    status: "Pending",
  };
  return await Sms.find(query).populate("receiver");
};

const updateSmsStatus = async (id, status) => {
  return await Sms.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status: status,
      },
    }
  );
};

const deleteSms = async (id) => {
  return await Sms.findByIdAndDelete(id);
};

module.exports = {
  createSms,
  getSms,
  updateSmsStatus,
  deleteSms,
  getPendingSmses,
};

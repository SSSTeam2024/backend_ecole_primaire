const SmsEnseignant = require("../../models/smsEnseignantModel/smsEnseignantModel");

const createSms = async (SmsData) => {
  return await SmsEnseignant.create(SmsData);
};

const getSms = async () => {
  return await SmsEnseignant.find().populate("receiver");
};

const getPendingSmses = async () => {
  const query = {
    status: "Pending",
  };
  return await SmsEnseignant.find(query).populate("receiver");
};

const updateSmsStatus = async (id, status) => {
  return await SmsEnseignant.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status: status,
      },
    }
  );
};

const deleteSms = async (id) => {
  return await SmsEnseignant.findByIdAndDelete(id);
};

const deletePendingSmses = async () => {
  const query = {
    status: "Pending",
  };
  return await SmsEnseignant.deleteMany(query);
};

module.exports = {
  createSms,
  getSms,
  updateSmsStatus,
  deleteSms,
  getPendingSmses,
  deletePendingSmses,
};

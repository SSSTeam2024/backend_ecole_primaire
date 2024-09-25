const Sms = require("../../models/smsModel/smsModel");

const createSms = async (SmsData) => {
  return await Sms.create(SmsData);
};

const getSms = async () => {
  return await Sms.find()
    .populate("receiver")
    .populate({
      path: "eleve",
      populate: {
        path: "classe",
      },
    });
};

const getPendingSmses = async () => {
  const query = {
    status: "Pending",
  };
  return await Sms.find(query).populate("receiver");
};

const deletePendingSmses = async () => {
  const query = {
    status: "Pending",
  };
  return await Sms.deleteMany(query);
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

const deleteSms = async (ids) => {
  const query = {
    _id: { $in: ids }, // Use the `$in` operator to match multiple IDs
  };
  return await Sms.deleteMany(query); // Use `deleteMany` to delete multiple documents
};

module.exports = {
  createSms,
  getSms,
  updateSmsStatus,
  deleteSms,
  getPendingSmses,
  deletePendingSmses,
};

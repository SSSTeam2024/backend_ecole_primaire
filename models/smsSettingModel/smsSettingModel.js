const mongoose = require("mongoose");

const smsSettingSchema = new mongoose.Schema({
  service_name: String,
  sms_status: String,
});

module.exports = mongoose.model("SmsSetting", smsSettingSchema);

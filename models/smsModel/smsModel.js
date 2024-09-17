const mongoose = require("mongoose");

const smsSchema = new mongoose.Schema({
  sender: String,
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: false,
    default: null,
  },
  msg: String,
  status: String,
});

module.exports = mongoose.model("Sms", smsSchema);

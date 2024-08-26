const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  msg: String,
  sender: String,
  receiver: String,
  date: String,
  heure: String,
  fichiers: [String],
});

module.exports = mongoose.model("Messagerie", msgSchema);

const mongoose = require("mongoose");

const cantineSchema = new mongoose.Schema({
  jour: String,
  repas: String,
  desc: String,
  creation_date: String,
  fichier: String,
});

module.exports = mongoose.model("Cantine", cantineSchema);

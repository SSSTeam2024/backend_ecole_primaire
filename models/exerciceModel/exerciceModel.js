const mongoose = require("mongoose");

const exerciceSchema = new mongoose.Schema({
  classes: [String],
  titre: String,
  desc: String,
  creation_date: String,
  badge_date: String,
  fichier: String,
  enseignant: String,
});

module.exports = mongoose.model("Exercice", exerciceSchema);

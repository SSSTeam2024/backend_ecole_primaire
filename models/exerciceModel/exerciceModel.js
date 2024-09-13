const mongoose = require("mongoose");

const exerciceSchema = new mongoose.Schema({
  classes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: false,
    default: null,
  },
  matiere: String,
  desc: String,
  creation_date: String,
  badge_date: String,
  fichier: String,
  enseignant: String,
});

module.exports = mongoose.model("Exercice", exerciceSchema);

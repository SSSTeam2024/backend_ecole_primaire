const mongoose = require("mongoose");

const absencesSchema = new mongoose.Schema({
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: false,
    default: null,
  },
  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matiere",
    required: false,
    default: null,
  },
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enseignant",
    required: false,
    default: null,
  },
  type: String,
  heure: String,
  date: String,
});

module.exports = mongoose.model("Absence", absencesSchema);
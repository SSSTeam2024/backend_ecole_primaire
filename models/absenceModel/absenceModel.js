const mongoose = require("mongoose");

const absencesSchema = new mongoose.Schema({
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: false,
    default: null,
  },
  matiere: String,
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enseignant",
    required: false,
    default: null,
  },
  eleves: [
    {
      eleve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etudiant",
        required: false,
        default: null,
      },
      typeAbsent: String,
    },
  ],
  heure: String,
  date: String,
  trimestre: String,
});

module.exports = mongoose.model("Absence", absencesSchema);

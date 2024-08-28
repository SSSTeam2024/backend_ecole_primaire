const mongoose = require("mongoose");

const calendrierSchema = new mongoose.Schema({
  salle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salle",
    required: false,
    default: null,
  },
  trimestre: String,
  heure_debut: String,
  heure_fin: String,
  date: String,
  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matiere",
    required: false,
    default: null,
  },
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: false,
    default: null,
  },
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enseignant",
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("Calendrier", calendrierSchema);

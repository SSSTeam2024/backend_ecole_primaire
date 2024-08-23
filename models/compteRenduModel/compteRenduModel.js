const mongoose = require("mongoose");

const compteRenduSchema = new mongoose.Schema({
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
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
  titre: String,
  desc: String,
  creation_date: String,
  fichier: String,
});

module.exports = mongoose.model("CompteRendu", compteRenduSchema);

const mongoose = require("mongoose");

const disciplineSchema = new mongoose.Schema({
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: false,
    default: null,
  },
  type: String,
  texte: String,
  editeur: String,
  date: String,
  fichier: String,
});

module.exports = mongoose.model("Discipline", disciplineSchema);

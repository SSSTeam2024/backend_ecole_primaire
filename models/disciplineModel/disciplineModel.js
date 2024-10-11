const mongoose = require("mongoose");

const disciplineSchema = new mongoose.Schema({
  eleve: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etudiant",
      required: false,
      default: null,
    },
  ],
  type: String,
  texte: String,
  editeur: String,
  date: String,
  fichier: String,
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("Discipline", disciplineSchema);

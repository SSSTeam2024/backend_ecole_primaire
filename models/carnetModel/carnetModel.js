const mongoose = require("mongoose");

const carnetSchema = new mongoose.Schema({
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: false,
    default: null,
  },
  trimestre: String,
  note: String,
  date: String,
  fichier: String,
});

module.exports = mongoose.model("Carnet", carnetSchema);

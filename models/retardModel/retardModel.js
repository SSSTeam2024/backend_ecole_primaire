const mongoose = require("mongoose");

const retardSchema = new mongoose.Schema({
  date: String,
  heure: String,
  id_eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: false,
    default: null,
  },
  trimestre: String,
});

module.exports = mongoose.model("Retard", retardSchema);

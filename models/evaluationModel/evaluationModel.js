const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
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
  trimestre: String,
  note: String,
  date: String,
});

module.exports = mongoose.model("Evaluation", evaluationSchema);

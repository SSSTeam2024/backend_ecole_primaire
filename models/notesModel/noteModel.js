const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
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
  type: String,
  note: String,
  date: String,
});

module.exports = mongoose.model("Note", notesSchema);

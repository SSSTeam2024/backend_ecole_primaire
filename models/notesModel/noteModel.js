const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
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
      note: String,
    },
  ],
  matiere: String,
  trimestre: String,
  type: String,
  date: String,
});

module.exports = mongoose.model("Note", notesSchema);

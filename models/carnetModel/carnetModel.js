const mongoose = require("mongoose");

const carnetSchema = new mongoose.Schema({
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: false,
    default: null,
  },
  trimestre: String,
  date: String,
  eleves: [
    {
      eleve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etudiant",
        required: false,
        default: null,
      },
      note: String,
      fichier: String,
    },
  ],
});

module.exports = mongoose.model("Carnet", carnetSchema);

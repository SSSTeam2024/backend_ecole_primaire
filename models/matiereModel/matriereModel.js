const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema({
  matieres: [
    {
      nom_matiere: String,
    },
  ],
  niveau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niveau",
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("Matiere", matiereSchema);

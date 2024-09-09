const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema({
  nom_matiere: String,
  classe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: false,
      default: null,
    },
  ],
});

module.exports = mongoose.model("Matiere", matiereSchema);

const mongoose = require("mongoose");

const etudiantSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  date_de_naissance: String,
  classe: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: false,
    default: null,
  },
  genre: String,
  avatar: String,
});

module.exports = mongoose.model("Etudiant", etudiantSchema);

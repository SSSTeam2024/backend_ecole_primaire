const mongoose = require("mongoose");

const enseignantSchema = new mongoose.Schema({
  nom_enseignant: String,
  prenom_enseignant: String,
  phone: String,
  matiere: String,
});

module.exports = mongoose.model("Enseignant", enseignantSchema);

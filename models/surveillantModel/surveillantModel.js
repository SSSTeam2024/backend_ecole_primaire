const mongoose = require("mongoose");

const surveillantSchema = new mongoose.Schema({
  nom_surveillant: String,
  prenom_surveillant: String,
  nom_utilisateur: String,
  mot_de_passe: String,
  tel: String,
});

module.exports = mongoose.model("Surveillant", surveillantSchema);

const mongoose = require("mongoose");

const inscriptionSchema = new mongoose.Schema({
  classe: String,
  nom_eleve: String,
  prenom_eleve: String,
  date_naissance: String,
  lieu_naissance: String,
  sexe: String,
  adresse_eleve: String,
  situation_familiale: String,
  avec: String,
  responsable_legal: String,
  nom_parent: String,
  prenom_parent: String,
  adresse_parent: String,
  profession: String,
  nom_societe: String,
  phone: String,
  status: String,
});

module.exports = mongoose.model("Inscription", inscriptionSchema);

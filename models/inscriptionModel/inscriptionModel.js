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
  nationalite: String,
  annee_scolaire: String,
  etablissement_frequente: String,
  moyenne_trimestre_1: String,
  moyenne_trimestre_2: String,
  moyenne_trimestre_3: String,
  moyenne_annuelle: String,
  moyenne_concours_6: String,
  numero_convocation_concours: String,
  copie_bulletin: String,
  photoProfil: String,
  groupe: String,
  notes: String,
});

module.exports = mongoose.model("Inscription", inscriptionSchema);

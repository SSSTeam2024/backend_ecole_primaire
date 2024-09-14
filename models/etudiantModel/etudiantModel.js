const mongoose = require("mongoose");

const etudiantSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  date_de_naissance: String,
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: false,
    default: null,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: false,
    default: null,
  },
  genre: String,
  avatar: String,
  statusPaiement: String,
  lieu_naissance: String,
  adresse_eleve: String,
  ville: String,
  nationalite: String,
  annee_scolaire: String,
  etablissement_frequente: String,
  moyenne_trimestre_1: String,
  moyenne_trimestre_2: String,
  moyenne_trimestre_3: String,
  moyenne_annuelle: String,
  moyenne_concours_6: String,
  numero_convocation_concours: String,
});

module.exports = mongoose.model("Etudiant", etudiantSchema);

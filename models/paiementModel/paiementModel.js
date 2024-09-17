const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema({
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: false,
    default: null,
  },
  designation: [String],
  period: String,
  annee_scolaire: String,
  montant: String,
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: false,
    default: null,
  },
  date_paiement: String,
});

module.exports = mongoose.model("Paiement", paiementSchema);

const mongoose = require("mongoose");

const abonnementSchema = new mongoose.Schema({
  cantine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cantine",
    required: false,
    default: null,
  },
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: false,
    default: null,
  },
  type: String,
  status: String,
});

module.exports = mongoose.model("Abonnement", abonnementSchema);

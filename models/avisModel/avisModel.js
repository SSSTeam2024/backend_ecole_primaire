const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema({
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: false,
      default: null,
    },
  ],
  editeur: String,
  titre: String,
  desc: String,
  creation_date: String,
  fichier: String,
});

module.exports = mongoose.model("Avis", avisSchema);

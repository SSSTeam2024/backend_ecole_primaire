const mongoose = require("mongoose");

const evenementSchema = new mongoose.Schema({
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: false,
      default: null,
    },
  ],
  titre: String,
  desc: String,
  type: String,
  creation_date: String,
  fichier: String,
});

module.exports = mongoose.model("Evenement", evenementSchema);

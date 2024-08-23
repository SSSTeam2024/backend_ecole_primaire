const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
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
  creation_date: String,
  fichier: String,
});

module.exports = mongoose.model("Document", documentSchema);

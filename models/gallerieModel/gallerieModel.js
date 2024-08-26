const mongoose = require("mongoose");

const gallerieSchema = new mongoose.Schema({
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
  fichiers: [String],
});

module.exports = mongoose.model("Gallerie", gallerieSchema);

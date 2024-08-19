const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema(
  {
    titre: String,
    date: String,
    description: String,
    classe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: false,
      default: null,
    },
    fichier: String,
    par: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Observation", observationSchema);

const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema({
  nom_classe: String,
  niveau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niveau",
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("Classe", classeSchema);

const mongoose = require("mongoose");

const niveauSchema = new mongoose.Schema({
  nom_niveau: String,
  type: String,
});

module.exports = mongoose.model("Niveau", niveauSchema);

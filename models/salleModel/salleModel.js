const mongoose = require("mongoose");

const salleSchema = new mongoose.Schema({
  nom_salle: String,
});

module.exports = mongoose.model("Salle", salleSchema);

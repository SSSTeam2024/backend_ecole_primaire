const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema({
  nom_matiere: String,
});

module.exports = mongoose.model("Matiere", matiereSchema);

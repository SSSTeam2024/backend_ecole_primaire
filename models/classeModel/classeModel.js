const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema({
  nom_classe: String,
});

module.exports = mongoose.model("Classe", classeSchema);

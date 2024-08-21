const mongoose = require("mongoose");

const emploiSchema = new mongoose.Schema({
  titre: String,
  date: String,
  image: String,
});

module.exports = mongoose.model("Emploi", emploiSchema);

const mongoose = require("mongoose");

const emploiSchema = new mongoose.Schema({
  titre: String,
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: false,
    default: null,
  },
  date: String,
  image: String,
});

module.exports = mongoose.model("Emploi", emploiSchema);

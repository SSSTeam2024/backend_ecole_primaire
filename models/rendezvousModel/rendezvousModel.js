const mongoose = require("mongoose");

const rendezvousSchema = new mongoose.Schema(
  {
    titre: String,
    date: String,
    description: String,
    enseignants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enseignant",
        required: false,
        default: null,
      },
    ],
    heure: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rendezvous", rendezvousSchema);

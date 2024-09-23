const mongoose = require("mongoose");

const rendezvousSchema = new mongoose.Schema(
  {
    titre: String,
    date: String,
    description: String,
    parents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: false,
        default: null,
      },
    ],
    heure: String,
    matiere: String,
    administration: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rendezvous", rendezvousSchema);

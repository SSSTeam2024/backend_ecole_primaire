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
    matiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matiere",
      required: false,
      default: null,
    },
    administration: String,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rendezvous", rendezvousSchema);

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  eleve: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etudiant",
      required: false,
      default: null,
    },
  ],
  titre: String,
  description: String,
  lu: String,
});

module.exports = mongoose.model("Notification", notificationSchema);

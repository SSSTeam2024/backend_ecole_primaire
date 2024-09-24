const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    eleve: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Etudiant",
          required: false,
          default: null,
        },
        notif_status: String,
      },
    ],
    titre: String,
    description: String,
    key: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);

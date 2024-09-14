const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    cin: String,
    nom_parent: String,
    prenom_parent: String,
    phone: String,
    username: String,
    password: String,
    fils: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etudiant",
        required: false,
        default: null,
      },
    ],
    api_token: String,
    onesignal_api_key: String,
    profession: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parent", parentSchema);

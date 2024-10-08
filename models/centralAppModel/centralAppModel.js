const mongoose = require("mongoose");

const centralAppSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    login: String,
    password: String,
    logo: String,
    api_token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CentralApp", centralAppSchema);

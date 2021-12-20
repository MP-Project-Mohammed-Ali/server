const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  isDelete: { type: Boolean, default: false },
  // FiledOfExpertise: { type: String, required: true },
  ststes: { type: String, enum: ["Pending", "Active"], default: "Pending" },
});

module.exports = mongoose.model("User", user);


//This file Done
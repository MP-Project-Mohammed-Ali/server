const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61c579806eec66fd5a9a30b6",
  },
  isDelete: { type: Boolean, default: false },
  case: { type: mongoose.Schema.Types.ObjectId, ref: "Cases" },
  clients: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  laweyrs: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  activeCode: { type: String },
  passwordCode: { type: String },
  activeAcount: { type: Boolean, default: false },
  type: { type: String },

  img: { type: String },
  bio: { type: String },
  Qualification: { type: String },
  Education: { type: String },
  FieldOfExpertise: { type: String },
  Trackslegal: { type: String },
  price: { type: String },

});

module.exports = mongoose.model("User", user);


const mongoose = require("mongoose");

const cases = new mongoose.Schema({
  title: { type: String, required: true },
  Descraption: { type: String, required: true },
  isDel:{type:Boolean,default:false},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // State: { type: String, required: true },
});

module.exports = mongoose.model("Cases", cases);

//This File Done

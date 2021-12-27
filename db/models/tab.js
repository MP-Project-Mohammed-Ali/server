const mongoose = require("mongoose");

const tab = new mongoose.Schema({
  title: { type: String, required: true },
  Descraption: [{ type: String, required: true }],
  image: [{ type: String }],
  caseID: { type: mongoose.Schema.Types.ObjectId, ref: "Cases" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Tab", tab);

//This File Done

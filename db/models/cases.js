const mongoose = require("mongoose");

const cases = new mongoose.Schema({
  title: { type: String, required: true },
  Descraption: [{ type: String, required: true }],
  isDel: { type: Boolean, default: false },
  tab: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tab" }],
  client: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  laywer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
});

module.exports = mongoose.model("Cases", cases);

//This File Done

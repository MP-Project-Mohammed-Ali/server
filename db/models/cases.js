const mongoose = require("mongoose");

const cases = new mongoose.Schema({
  title: { type: String, required: true },
  Descraption: { type: String, required: true },
  State: { type: String, required: true },
});

module.exports = mongoose.module("Cases", cases);

//This File Done

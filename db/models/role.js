const mongoose = require("mongoose");

const role = new mongoose.Schema({
  role: { type: String, require: true },
  permissions: { type: Array },
});

module.exports = mongoose.module("Role", role);

//This file Done
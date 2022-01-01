const mongoose = require("mongoose");

const status = new mongoose.Schema({
  status: { type: String, required: true },
});

module.exports = mongoose.model("Status", status);

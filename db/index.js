const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const DB_URI = process.env.DB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DB_URI, options).then(() => {
  console.log("WOW DB is REDY TO YOUR DATA");
}),
  (err) => {
    console.log("ERROR IS HERE", err);
  };



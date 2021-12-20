const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./db/index");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`PORT is RUN ON ${PORT} NOW DON'T WORRY `);
});

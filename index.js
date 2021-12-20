const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./db/index");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("./routers/routes/user");
app.use(userRouter);

const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`PORT is RUN ON ${PORT} NOW DON'T WORRY `);
});

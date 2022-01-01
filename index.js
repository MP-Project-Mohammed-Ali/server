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

const caseRouter = require("./routers/routes/cases");
app.use(caseRouter);

const tabRouter = require("./routers/routes/tab");
app.use(tabRouter);

const statusRouter = require("./routers/routes/status");
app.use(statusRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`PORT is RUN ON ${PORT} NOW DON'T WORRY `);
});

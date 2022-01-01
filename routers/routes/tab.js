const express = require("express");
const tabRouter = express.Router();
const { CreateTab, GetTab } = require("../controllers/tab");

const authentication = require("../middleware/authentication");

tabRouter.post("/createtab", authentication, CreateTab);

tabRouter.get("/get/tab", authentication, GetTab);

module.exports = tabRouter;

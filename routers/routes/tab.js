const express = require("express");
const tabRouter = express.Router();
const { CreateTab, GetTab } = require("../controllers/tab");

const authentication = require("../middleware/authentication");

tabRouter.post("/createtab",authentication, CreateTab);

tabRouter.post("/get_tab",GetTab)

module.exports = tabRouter;

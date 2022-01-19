const express = require("express");
const tabRouter = express.Router();
const { CreateTab, GetTab,deleteTab,updateTab } = require("../controllers/tab");

const authentication = require("../middleware/authentication");

tabRouter.post("/createtab",authentication, CreateTab);

tabRouter.post("/get_tab",GetTab)
tabRouter.put("/delete_tab/:id",authentication,deleteTab)
tabRouter.put("/update/tab/:id",authentication,updateTab)

module.exports = tabRouter;

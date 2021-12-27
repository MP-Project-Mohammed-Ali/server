const express = require("express");
const tabRouter = express.Router();
const createtab= require('../controllers/tab')

const authentication = require("../middleware/authentication");


tabRouter.post("/createtab",authentication, createtab);

module.exports = tabRouter;
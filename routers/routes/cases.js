const express = require("express");
const caseRouter = express.Router();

const newCase = require("../controllers/cases");
const authentication = require("../middleware/authentication");

caseRouter.post("/addcase", authentication, newCase);

module.exports = caseRouter;
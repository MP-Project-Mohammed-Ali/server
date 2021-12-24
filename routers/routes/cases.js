const express = require("express");
const caseRouter = express.Router();

const { newCase, getCase, showcase,updateCase } = require("../controllers/cases");
const authentication = require("../middleware/authentication");

caseRouter.post("/addcase", authentication, newCase);
caseRouter.get("/showcase/:id", authentication, getCase);
caseRouter.get("/showallcase", showcase);
caseRouter.put("/update/:id",updateCase);

module.exports = caseRouter;

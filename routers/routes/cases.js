const express = require("express");
const caseRouter = express.Router();

const {
  newCase,
  getCase,
  showcase,
  updateCase,
  deleteCase,
} = require("../controllers/cases");
const authentication = require("../middleware/authentication");

caseRouter.post("/addcase", authentication, newCase);
caseRouter.get("/showcase/:id", authentication, getCase);
caseRouter.get("/showallcase", showcase);
caseRouter.put("/update/:id", authentication, updateCase);
caseRouter.delete("/del/:id", deleteCase);

module.exports = caseRouter;

const express = require("express");
const caseRouter = express.Router();

const {
  newCase,
  getCase,
  showcase,
  updateCase,
  deleteCase,
  ChengeCaseStatus,
  laywercase
} = require("../controllers/cases");
const authentication = require("../middleware/authentication");

caseRouter.post("/addcase", authentication, newCase);
caseRouter.get("/show/case/:id", getCase);
caseRouter.post("/show/allcase",authentication, showcase);
caseRouter.put("/update/:id", authentication, updateCase);
caseRouter.delete("/delete/case/:id",authentication, deleteCase);
caseRouter.put("/chang/case/:id",ChengeCaseStatus)
caseRouter.get("/laywer/case",authentication, laywercase);

module.exports = caseRouter;

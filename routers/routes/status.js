const express = require("express");
const statusRouter = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  addStatus,
  getStatus,
  // getSatatusPending,
  // getAllStatus,
  // getStatusbyId,
} = require("../controllers/status");

statusRouter.post("/status/create", authentication, authorization, addStatus);
statusRouter.get("/status/show", authentication, authorization, getStatus);

module.exports = statusRouter;

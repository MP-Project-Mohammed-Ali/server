const express = require("express");
const { create, getrole } = require("./../controllers/role");
const roleRouter = express.Router();

roleRouter.post("/createrole", create);
roleRouter.get("/displayrole", getrole);

module.exports = roleRouter;

//This File done

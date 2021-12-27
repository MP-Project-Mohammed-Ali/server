const express = require("express");
const userRouter = express.Router();

const {
  Register,
  VerifyAccount,
  CheckEmail,
  ResetPassword,
  Login,
  ChengeUserStatus,
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");

userRouter.post("/singup", Register);
userRouter.post("/active", VerifyAccount);
userRouter.post("/check", CheckEmail);
userRouter.post("/resetpas", ResetPassword);
userRouter.post("/login/new", Login);
userRouter.put("/changestatus", ChengeUserStatus);

module.exports = userRouter;

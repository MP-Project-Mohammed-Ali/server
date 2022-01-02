const express = require("express");
const userRouter = express.Router();

const {
  Register,
  VerifyAccount,
  CheckEmail,
  ResetPassword,
  Login,
  ChengeUserStatus,
  GetUser,
  DeleteUser,
  ProfileUser,
  EditProfileUser,
  DeleteProfile,
  AddInformation,
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");

userRouter.post("/singup", Register);
userRouter.post("/active", VerifyAccount);
userRouter.post("/check", CheckEmail);
userRouter.post("/resetpas", ResetPassword);
userRouter.post("/login/new", Login);
userRouter.post("/add/information", AddInformation);

userRouter.get("/show/alluser", GetUser);

userRouter.delete("/delete/user", DeleteUser);

userRouter.put("/changestatus/:id", ChengeUserStatus);

userRouter.get("/profile/:id",authentication, ProfileUser);
userRouter.put("/edit/Profile/:email", EditProfileUser);
userRouter.delete("/delete/profile/:id", DeleteProfile);

userRouter.get("/display/:_id");
module.exports = userRouter;

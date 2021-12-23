// const express = require("express");
// const {register,login,activate} = require("./../controllers/user");
// const userRouter = express.Router();

// userRouter.post("/singup", register);
// userRouter.post("/login",login)
// userRouter.get('/activate/:token', activate);

// module.exports = userRouter;


// //This File need some improvements

const express = require("express");
const userRoute = express.Router();


const {
  resgister,
  activate,
  login,getuser
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");



userRoute.post("/resgister", resgister);
userRoute.get('/activate/:token', activate);
userRoute.post("/login", login);
userRoute.get("/showuser",getuser)
// userRoute.post('/forgott', forgotPassword);
// userRoute.get('/forgot/:token', gotoReset);
// userRoute.post('/reset/:id', resetPassword);

module.exports = userRoute;

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRT_KEY = process.env.SECRT_KEY;

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(403).json({ message: "forbidden" });
    const token = req.headers.authorization.split(" ")[1];
    const parssedToken = jwt.verify(token, SECRT_KEY);

    req.token = parssedToken;
    console.log(req.token);
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};
module.exports = authentication;

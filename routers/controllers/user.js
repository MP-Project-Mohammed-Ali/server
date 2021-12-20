const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemiler = require("nodemailer");
const passport = require("passport")

// Get this date From .env
const SALT = Number(process.env.SALT);
const SECRT_KEY = process.env.SECRT_KEY;
const SECRET_RESET_KEY=process.env.SECRET_RESET_KEY;


// simple register to test 
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const saveEmail = email.toLowerCase();
  const savePassword = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    name,
    email: saveEmail,
    password: savePassword,
  });
  newUser
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  userModel
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (result.email == email) {
          const savePassword = await bcrypt.compare(password, result.password);
          const payload = {
            email,
          };
          if (savePassword) {
            const token = jwt.sign(payload, SECRT_KEY);
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("Wrong email or password");
          }
        } else {
          res.status(400).json("Wrong email or password");
        }
      } else {
        res.status(404).json("Email not exist");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};


module.exports = { register, login };

//This File need more improvements 

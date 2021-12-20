const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT = Number(process.env.SALT);

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const saveEmail = email.toLowerCase();
  const savePassword = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    email: saveEmail,
    password: savePassword,
    role,
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

module.exports = { register };

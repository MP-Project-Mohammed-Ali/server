const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemiler = require("nodemailer");
// const passport = require("passport");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Get this date From .env
const SALT = Number(process.env.SALT);
const SECRT_KEY = process.env.SECRT_KEY;
const SECRET_RESET_KEY = process.env.SECRET_RESET_KEY;

const CLIENT_URL = "http://localhost:3000";


// simple register to test
// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const saveEmail = email.toLowerCase();
//   const savePassword = await bcrypt.hash(password, SALT);

//   const newUser = new userModel({
//     name,
//     email: saveEmail,
//     password: savePassword,
//   });
//   newUser
//     .save()
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };

const register = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "enter all file" });
  }
  if (password != password2) {
    errors.push({ msg: "password do not mutch" });
  }
  if (password.length < 8) {
    errors.push({ msg: "password must be more 8 characters" });
  }
  if (errors.length > 0) {
    res.status(200).json({
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    userModel.findOne({ email: email }).then((user) => {
      // console.log(user);
      if (user) {
        errors.push({ msg: "email already exist" });
        res.status(200).json({
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const oauth2Clinent = new OAuth2(
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
          "OKXIYR14wBB_zumf30EC__iJ",
          "https://developers.google.com/oauthplayground"
        );

        oauth2Clinent.setCredentials({
          refresh_token:
            "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        });

        const accessToken = oauth2Clinent.getAccessToken();
        const token = jwt.sign({ name, email, password }, SECRT_KEY, {
          expiresIn: "30m",
        });
        const output = ` <h3> Please click on below link to activate your account </h3>
        <p>${CLIENT_URL}</p>
        <h5><b>NOTE : </b> The abouve activation link expires in 30 minutes</h5>`;


        const transporter = nodemiler.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId:
              "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken:
              "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken,
          },
        });

        const mailOptions = {
          from: `"Auth Admin"<nodejsa@gmail.com>`,
          to: email,
          subject: "Account Verification: NodeJS Auth ",
          generateTextFromHTML: true,
          html: output,
        };
        console.log(mailOptions);
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(200).json({
              err: "someting went wrong on our end. Please register again",
            });
          } else {
            console.log("Mail send :%s", info.response);
            res.status(200).json({
              massage:
                "Activation link sent to email ID. Please activate to log in.",
            });
          }
        });
      }
    });
  }
};

const resetPassword = (req, res) => {
  const { password, password2 } = req.body;
  const id = req.params.id;
  if (!password || !password2) {
    res.json({ error: "please enter all fields" });
  } else if (password.length < 8) {
    res.json({ error: "password must be at least 8 characters" });
  } else if (password != password2) {
    res.json({ error: "password do not match." });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        password = hash;
        userModel.findByIdAndUpdate(
          { _id: id },
          { password },
          function (err, result) {
            if (err) {
              res.json({ error: "enter resetting password " });
            } else {
              res.json({ error: "password reset successfully" });
            }
          }
        );
      });
    });
  }
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



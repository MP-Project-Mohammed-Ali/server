const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

//Get this date From .env
const SECRT_KEY = process.env.SECRT_KEY;
const SECRET_RESET_KEY = process.env.SECRET_RESET_KEY;
const SALT = Number(process.env.SALT);

const CLIENT_URL = "http://localhost:4000";

const resgister = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 8 characters" });
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
      if (user) {
        errors.push({ msg: "Email address already registered" });
        res.status(200).json({
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const oauth2Client = new OAuth2(
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
          "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token:
            "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign({ name, email, password }, SECRT_KEY, {
          expiresIn: "30m",
        });

        const output = `
                  <h2>Please click on below link to activate your account</h2>
                  <p>${CLIENT_URL}/activate/${token}</p>
                  <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                  `;

        const transporter = nodemailer.createTransport({
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
          from: '"Auth Admin" <nodejsa@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Account Verification: NodeJS Auth ✔", // Subject line
          generateTextFromHTML: true,
          html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(200).json({
              err: "Something went wrong on our end. Please register again.",
            });
          } else {
            console.log("Mail sent : %s", info.response);
            res.status(200).json({
              message:
                "Activation link sent to email.",
            });
          }
        });
      }
    });
  }
};

const activate = (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, SECRT_KEY, (err, decodedToken) => {
      if (err) {
        res.json({ err: "Incorrect or expired link! Please register again." });
      } else {
        const { name, email, password } = decodedToken;
        userModel.findOne({ email: email }).then(async (user) => {
          if (user) {
            res.json({ err: "Email already registered! Please log in." });
          } else {
            const hashedPassword = await bcrypt.hash(password, SALT);
            const newUser = new userModel({
              name,
              email,
              password: hashedPassword,
            });

            newUser.save().then((user) => {
              res.json({ success: user });
            });
            // bcrypt.hash(newUser.password, 10, (err, hash) => {
            //   if (err) throw err;
            //   newUser.password = hash;
            //   newUser
            //     .save()
            //     .then((user) => {
            //       res.json({ success: user });
            //     })
            //     .catch((err) => console.log(err));
            // });
          }
        });
      }
    });
  } else {
    console.log("Account activation error!");
  }
};

const login = (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const SECRT_KEY = process.env.SECRT_KEY;
  if (!((email || name) && password)) {
    res.status(200).json({ msg: " fill all fields" });
  } else {
    userModel
      .findOne({ $or: [{ name }, { email }] })
      .then(async (result) => {
        // console.log(result);
        if (result) {
          if (email === result.email || name === result.name) {
            const payload = {
              id: result._id,
              role: result.role,
            };
            const options = {
              expiresIn: "30m",
            };
            const token = jwt.sign(payload, SECRT_KEY, options);
            console.log(token);
            const unhashPassword = await bcrypt.compare(
              password,
              result.password
            );
            console.log(unhashPassword);
            if (unhashPassword) {
              res.status(200).json({ result, token });
            } else {
              res.status(200).json("invalid name or password 1");
            }
          } else {
            res.status(200).json("invalid name or password 2");
          }
        } else {
          res.status(200).json("name or password does not exist");
        }
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  }
};

const getuser = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { resgister, activate, login, getuser };

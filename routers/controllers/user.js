const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const passport = require("passport");

require("dotenv").config();

const SALT = Number(process.env.SALT);
const SECRET_RESET_KEY = process.env.SECRET_RESET_KEY;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

//  REGISTER
const Register = async (req, res) => {
  const {
    name,
    email,
    password,
    isLawyer,
    type,
    img,
    bio,
    Qualification,
    Education,
    FieldOfExpertise,
    Trackslegal,
    price,
    role,
  } = req.body;
  const semail = email.toLowerCase();
  const hashpass = await bcrypt.hash(password, SALT);
  const characters = "0123456789";
  let activeCode = "";
  for (let i = 0; i < 4; i++) {
    activeCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  const newUser = new userModel({
    email: semail,
    password: hashpass,
    name,
    activeCode,
    status: isLawyer ? process.env.PENDING : process.env.APPROVED,
    type,
    img,
    bio,
    Qualification,
    Education,
    FieldOfExpertise,
    Trackslegal,
    price,
    role,
  });
  console.log(newUser);
  newUser
    .save()
    .then((result) => {
      transport
        .sendMail({
          from: process.env.EMAIL,
          to: semail,
          subject: "Please confirm your account",
          html: `<h1>Email Confirmation</h1>
              <h2>Hello ${semail}</h2>
              <h4>CODE: ${activeCode}</h4>
              <p>Thank you for registering. Please confirm your email by entring the code on the following link</p>
              <a href=https://estishara.herokuapp.com/active/${result._id}> Click here</a>`,
        })
        .catch((err) => console.log(err));
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const AddInformation = (req, res) => {
  const { img, bio, Qualification, Education, FieldOfExpertise, Trackslegal } =
    req.body;

  const newInformation = new userModel({
    img,
    bio,
    Qualification,
    Education,
    FieldOfExpertise,
    Trackslegal,
  });
  newInformation
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.send(err));
};
//  VERIFY_ACCOUNT
const VerifyAccount = async (req, res) => {
  const { id, code } = req.body;
  const user = await userModel.findOne({ _id: id });
  console.log("user on line 419", user);
  if (user.activeCode == code) {
    userModel
      .findByIdAndUpdate(
        id,
        { activeAcount: true, activeCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong code..");
  }
};

// CHECK_EMAIL
const CheckEmail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    userModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport.sendMail({
          from: process.env.EMAIL,
          to: result.email,
          subject: "Reset Your Password",
          html: `<h1>Reset Your Password</h1>
              <h2>Hello ${result.name}</h2>
              <h4>CODE: ${passwordCode}</h4>
              <p>Please enter the code on the following link and reset your password</p>
              <a href=https://estishara.herokuapp.com/reset/${result._id}> Click here</a>
              </div>`,
        });
        console.log(result._id);
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};

// RESET_PASSWORD
const ResetPassword = async (req, res) => {
  const { id, code, password } = req.body;
  const user = await userModel.findOne({ _id: id });
  if (user.passwordCode == code) {
    const hashedPassword = await bcrypt.hash(password, SALT);
    userModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword, passwordCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code...");
  }
};

//LOGIN
const Login = (req, res) => {
  const { name, email, password } = req.body;
  const SECRT_KEY = process.env.SECRT_KEY;
  userModel
    .findOne({ $or: [{ email }, { name }] })

    .then(async (result) => {
      console.log("the result", result);
      if (result) {
        console.log(result.email);
        if (email == result.email) {
          console.log(email);
          const savePassword = await bcrypt.compare(password, result.password);
          console.log(savePassword);
          const payload = {
            role: result.role,
            id: result._id,
            email: result.email,
          };
          console.log("this is payload", payload);
          console.log("the result on line 520", result);

          if (savePassword) {
            if (result.activeAcount == true) {
              const token = jwt.sign(payload, SECRT_KEY);
              res.status(200).json({ result, token });
            } else {
              res.status(400).json("please Active your account");
            }
          } else {
            res.status(400).json("Wrong email or password 1");
          }
        } else {
          res.status(400).json("Wrong email or password 2 ");
        }
      } else {
        res.status(404).json("Email not exist");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

// CHENGE_USER_STATUS
const ChengeUserStatus = (req, res) => {
  const { id } = req.params;
  const { status_id } = req.body;

  userModel
    .findByIdAndUpdate({ _id: id }, { status: status_id }, { new: true })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: ` ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//GET_USER
const GetUser = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//DELETE_USER
const DeleteUser = (req, res) => {
  console.log(req);
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(id, { $set: { isDelete: true } })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json("Deleted");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//PROFILE_USER
const ProfileUser = (req, res) => {
  const { id } = req.params;
  userModel
    .find({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    })
    .catch((err) => {
      res.satatus(400).json(err);
    });
};


//EDIT_PROFILE
const EditProfileUser = (req, res) => {
  const { email } = req.params;
  const { name, newEmail } = req.body;
  userModel
    .findOneAndUpdate(
      { email: `${email}` },
      {
        $set: {
          name: name,
          email: newEmail,
          time: Date(),
        },
      },
      { new: true }
    )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//DELETE_PROFILE
const DeleteProfile = (req, res) => {
  const { id } = req.params;

  userModel
    .findOneAndRemove({ _id: id }, { new: true })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
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
};

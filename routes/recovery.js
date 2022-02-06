const router = require("express").Router();
const User = require("../models/User.model");
const recoveryTemplate = require("../config/recoveryTemplate").recoveryTemplate;
let { transporter, recoveryText } = require("../config/nodemailer");

// package used for password hashing
const bcrypt = require("bcryptjs");
const saltRounds = 10;


// post recovery request route
router.post("/request", (req, res, next) => {
  const { email } = req.body;

  // search for email in database
  User.findOne({ email })
    .then((user) => {
      // return an error if email not found
      if (!user) {
        res.status(400).json({ message: "There is no account linked to this email address." });
        return;
      }

      // else, send recovery email
      return transporter
        .sendMail({
          from: '"Quartz" <help@quartz.com>',
          to: email,
          subject: "Reset password request",
          text: recoveryText,
          html: recoveryTemplate(user._id)
        })
        .then(() => { 
          res.status(200).json({ message: `An email has been sent to ${email}.` })
        })
    })
    .catch(() => res.status(500).json({ message: "Something went wrong." }))
})


// get reset-password route
router.get("/reset-password/:userId", (req, res, next) => {
  const userId = req.params.userId;

  res.status(200).json({ userId });
})


// post reset-password route
router.post("/reset-password/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const { password, passwordConfirm } = req.body;

  // make sure no field is empty
  if (!password || !passwordConfirm) {
    res.status(400).json({ message: "Please fill in all fields." });
    return;
  }

  // make sure both passwords are the same
  if (password !== passwordConfirm) {
    res.status(400).json({ message: "Confirmation password doesn't match password." });
    return;
  }

  // make sure password has the right format
  const pwdRgex = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
  if (!pwdRgex.test(password)) {
    res.status(400).json({ message: "Password must contain at least 8 characters, one cap letter, one number and one special character." });
    return;
  }

  // hash password
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashedPwd = bcrypt.hashSync(password, salt);

  // update user profile
  User.findByIdAndUpdate(userId, { password: hashedPwd }, { new: true })
    .then(() => res.status(200).json({ message: "Your password has been updated successfully." }))
    .catch(() => res.status(500).json({ message: "Something went wrong." }))
})


module.exports = router;
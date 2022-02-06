const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  {
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PWD
    }
  }
);

const recoveryText = "";


module.exports = { transporter, recoveryText };
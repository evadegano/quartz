const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "This email address has already been registered."],
      required: [true, "Email address is required."],
    },
    password: {
      type: String,
      trim: true
    },
    googleID: String,
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema);


module.exports = User;
const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email address is required."],
    },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required."],
    }
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema);


module.exports = User;
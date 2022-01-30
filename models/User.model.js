const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email address is required."],
    //match: []
    },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required."],
    //match: []
    }
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema);

module.exports = User;
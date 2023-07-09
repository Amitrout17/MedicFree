const mongoose = require("mongoose");

const userScheema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a valid name"],
  },
  age: {
    type: Number,
    required: [true, "please enter a valid name"],
  },
  address: {
    type: String,
    required: [true, "please Enter a valid address"],
  },
  document: {
    type: String,
    required: [true, "please Enter a valid document"],
  },
  role: {
    type: String,
    default: "user"
  },
  email: {
    type: String,
    required: [true, "please Enter a email"],
  },
  password: {
    type: String,
    required: [true, "please Enter a password"],
  },
  phone: {
    type: Number,
    required: [true, "Enter phone Number"],
  },
  varified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userScheema);

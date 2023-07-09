const mongoose = require("mongoose");

const testCenterScheema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the name of test center"],
  },
  address: {
    type: String,
    required: [true, "Enter the address of the test center"],
  },
  pin: {
    type: Number,
    required: [true, "Enter the pin code"],
  },
  centerImage: {
    type: String,
  },
  test: [
    {
      testName: {
        type: String,
        required: [true, "Enter the test name"],
      },
      details: {
        type: String,
        required: [true, "Enter the details of test center"],
      },
      image: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("testCenterModel", testCenterScheema);

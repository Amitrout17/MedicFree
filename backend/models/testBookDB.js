const mongoose = require("mongoose");

const testBookingScheema = new mongoose.Schema({
  testName: {
    type: String,
    required: [true, "Enter Test Name"],
  },
  testDetails: {
    type: String,
    required: [true, "Enter test details"],
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  testCenterId: {
    type: mongoose.Schema.ObjectId,
    ref: "testCenterModel",
  },
  testId: {
    type: mongoose.Schema.ObjectId,
    ref: "testCenterModel",
  },
  day: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  time: {
    type: String,
  },
  resultStatus: {
    type: String,
    default: "pending",
  },
  resultDocument: {
    type: String,
    default: "NA",
  },
});

module.exports = mongoose.model("testBookingModel", testBookingScheema);

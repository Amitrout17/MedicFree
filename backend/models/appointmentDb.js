const mongoose = require("mongoose");

const appointmentScheema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "doctorModel",
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  time: {
    type: Number,
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
});

module.exports = mongoose.model("appointmentModel", appointmentScheema);

const mongoose = require("mongoose");
const doctorScheema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the name of doctor"],
  },
  spaciality: {
    type: String,
    required: [true, "Enter the spaciality"],
  },
  experience: {
    type: Number,
    required: [true, "Enter the year of experience"],
  },
  qualification: {
    type: String,
    required: [true, "Enter the qualification"],
  },
  appointments: [
    {
      date: {
        type: String,
        required: [true, "Enter the name of doctor"],
      },
      time: {
        type: String,
        required: [true, "Enter the doctor speciality"],
      },
    },
  ],
});

module.exports = mongoose.model("doctorModel", doctorScheema);
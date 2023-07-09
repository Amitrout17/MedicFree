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
      },
      time: {
        //of formate 10:30
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("doctorModel", doctorScheema);

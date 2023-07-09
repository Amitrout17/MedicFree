const mongoose = require("mongoose");

const medicalScheema = new mongoose.Schema({
  medicalName: {
    type: String,
    required: [true, "Enter the name of medical"],
  },
  address: {
    type: String,
    required: [true, "Enter the address"],
  },
  pin: {
    type: String,
    required: [true, "Enter the pin"],
  },
  doctor: [
    {
      name: {
        type: String,
        required: [true, "Enter the name of doctor"],
      },
      speciality: {
        type: String,
        required: [true, "Enter the doctor speciality"],
      },
    },
  ],
  image: {
    type: String,
  },
  beds: {
    type: Number,
    required: [true, "Enter the deds details"],
  },
});

module.exports = mongoose.model("medicalModel", medicalScheema);

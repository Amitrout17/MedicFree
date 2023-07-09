const mongoose = require("mongoose");
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;

var d = new Date(); // for now
const hr = d.getHours(); // => 9
const min = d.getMinutes(); // =>  30
const sec = d.getSeconds(); // => 51
let currentTime = `${hr}:${min}`;

const emergencyMedicineScheema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },

  patientName: {
    type: String,
    ref: "user",
  },
  medicineName: {
    type: String,
    require: [true, "Medicine Name is required"],
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },

  date: {
    type: String,
    default: currentDate,
  },
  time: {
    type: String,
    default: currentTime,
  },
  Availabilitystatus: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model(
  "emergencyMedicineModel",
  emergencyMedicineScheema
);

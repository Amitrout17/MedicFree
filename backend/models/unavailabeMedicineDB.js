const mongoose = require("mongoose");

const unavailabeMedicineScheema = new mongoose.Schema({
  medicineName: {
    type: String,
    require: [true, "Medicine Name is required"],
  },
  image: {
    type: String,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  Availabilitystatus: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model(
  "unavailbeMedicineModel",
  unavailabeMedicineScheema
);

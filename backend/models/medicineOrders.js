const mongoose = require("mongoose");

const medicineOrderScheema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  storeId: {
    type: mongoose.Schema.ObjectId,
    ref: "medicineModel",
  },
  medicineId: {
    type: mongoose.Schema.ObjectId,
    ref: "medicineModel",
  },
});

module.exports = mongoose.model("medicineOrder", medicineOrderScheema);

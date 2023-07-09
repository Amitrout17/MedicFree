const mongoose = require("mongoose");

const doctorEyeScheema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  logs: {
    message: {
      type: String,
    },
    aiConclusion: {
      type: String,
    },
    time: {
      type: String,
    },
    date: {
      type: String,
    },
  },
});

module.exports = mongoose.model("doctorEyeModel", doctorEyeScheema);

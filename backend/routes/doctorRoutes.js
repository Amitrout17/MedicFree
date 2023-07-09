const express = require("express");
const {
  addDoctor,
  getDoctorBySpeciality,
} = require("../controllers/doctorAppointment");
const router = express.Router();

router.route("/api/v1/doctor/new").post(addDoctor);
router.report("/api/v1/doctor/:spaciality").get(getDoctorBySpeciality);

module.exports = router;

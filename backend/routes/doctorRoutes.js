const express = require("express");
const {
  addDoctor,
  getDoctorBySpeciality,
  scheduleDoctorAppointment,
} = require("../controllers/doctorAppointment");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

router.route("/api/v1/doctor/new").post(addDoctor);
router.route("/api/v1/doctor/:spaciality").get(getDoctorBySpeciality);
router
  .route("/api/v1/new/appointment")
  .post(isAuthenticated, scheduleDoctorAppointment);

module.exports = router;

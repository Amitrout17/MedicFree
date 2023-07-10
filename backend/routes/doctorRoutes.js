const express = require("express");
const {
  addDoctor,
  getDoctorBySpeciality,
  scheduleDoctorAppointment,
  getPerticularAppointment,
  getMyappointment,
  getDoctorAppointments,
} = require("../controllers/doctorAppointment");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

router.route("/api/v1/doctor/new").post(addDoctor);
router.route("/api/v1/doctor/:spaciality").get(getDoctorBySpeciality);
router
  .route("/api/v1/new/appointment/:doctorId")
  .post(isAuthenticated, scheduleDoctorAppointment);

router.route("/api/v1/appointment/get/:id").get(getPerticularAppointment);

router.route("/api/v1/appointment/all/my/:id").get(getMyappointment);

router.route("/api/v1/appointment/all/my/doc/:id").get(getDoctorAppointments)

module.exports = router;

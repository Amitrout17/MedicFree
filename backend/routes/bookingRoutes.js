//this routes are for booking of medicines and as well as test

const express = require("express");
const isAuthenticated = require("../middleware/auth");

const { bookMedicine } = require("../controllers/bookings/medicineBooking");
const {
  getAvailabletest,
  bookNewLabTest,
  getScheduleDetails,
} = require("../controllers/bookings/testBooking");
const router = express.Router();
router
  .route("/api/v1/booking/medicine/new")
  .post(isAuthenticated, bookMedicine);

//routes for booking of test

router.route("/api/v1/test/get/availableTest/:id").get(getAvailabletest);
router
  .route("/api/v1/test/newTest/:testCenterId/:testId")
  .post(isAuthenticated, bookNewLabTest);
router.route("/api/v1/test/get/testDetails/:id").get(getScheduleDetails);
module.exports = router;

const express = require("express");
const {
  createNewEmergencyRequest,
  getEmergencyRequestMedicines,
  getAdmin,
} = require("../controllers/emergencyMedicineController");
const isAuthenticated = require("../middleware/auth");
const { upload } = require("../config/fileupload");

const router = express.Router();

router
  .route("/api/emergencyMedicine/new")
  .post(isAuthenticated, upload, createNewEmergencyRequest);
router
  .route("/api/emergencyMedicine/get/:id")
  .get(isAuthenticated, getEmergencyRequestMedicines);
  router
  .route("/api/emergencyMedicine/getadmin")
  .get( getAdmin);

module.exports = router;
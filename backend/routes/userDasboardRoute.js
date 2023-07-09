const express = require("express");
const isAuthenticated = require("../middleware/auth");

const {
		getUserInfo,
    userProfileUpdate
  
} = require("../controllers/userDashboard/userUpdate");

const {findAllUnavailableMedicineDetails}=require("../controllers/userDashboard/unavailableMedicineDetails")
const {findAllEmergencyMedicineDetails}=require("../controllers/userDashboard/EmergencyMedicineDetails")
const {findAllLabTestDetails}=require("../controllers/userDashboard/labTestList")
const {findAllMedicineList}=require("../controllers/userDashboard/userMedicineList")



const router = express.Router();

router
  .route("/api/dashboard/profileUpdate/:id")
  .post(isAuthenticated, userProfileUpdate);
router
  .route("/api/dashboard/getUserInfo/:id")
  .get(isAuthenticated, getUserInfo);
router
  .route("/api/dashboard/unavailablemedicine/:id")
  .get( isAuthenticated,findAllUnavailableMedicineDetails);
router
  .route("/api/dashboard/EmergencyMedicine/:id")
  .get( isAuthenticated,findAllEmergencyMedicineDetails);
router
  .route("/api/dashboard/labTest/:id")
  .get( findAllLabTestDetails);
router
  .route("/api/dashboard/medicinelist/:id")
  .get(findAllMedicineList);

module.exports = router;

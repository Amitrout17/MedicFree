const express = require("express");
const router = express.Router()
const isAuthenticated = require("../middleware/auth");

const{findAllEmergencyList,emergencyMedicineUpdate}=require("../controllers/admin/emergencyMedicineUpdate")
const{findAllUnailableList,unavailableMedicineUpdate}=require("../controllers/admin/unavailableMedicineUpdate")
const {
    getAllUser,
    deleteUser,
    updateUserVerification,
    getPendingTestResults,
    publishTestResults,
} = require("../controllers/admin/adminUserController");


router.route("/admin/get/emergencymedicine").get(isAuthenticated, findAllEmergencyList);
router.route("/admin/update/emergencymedicine").post(isAuthenticated, emergencyMedicineUpdate);

router.route("/admin/get/unavailablemedicine").get(isAuthenticated, findAllUnailableList);
router.route("/admin/update/unavailablemedicine").post(isAuthenticated, unavailableMedicineUpdate);

router.route("/api/v1/admin/getalluser").get(isAuthenticated, getAllUser);
router.route("/api/v1/admin/deleteuser").post(isAuthenticated, deleteUser);
router.route("/api/v1/admin/updateuserverification").post(isAuthenticated, updateUserVerification);
router.route("/api/v1/admin/getpendingtestresults").get(isAuthenticated, getPendingTestResults);
router.route("/api/v1/admin/publishtestresults").post(isAuthenticated, publishTestResults);

module.exports = router;

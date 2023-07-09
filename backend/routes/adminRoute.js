const express = require("express");
const router = express.Router()

const{findAllEmergencyList,emergencyMedicineUpdate}=require("../controllers/admin/emergencyMedicineUpdate")
const{findAllUnailableList,unavailableMedicineUpdate}=require("../controllers/admin/unavailableMedicineUpdate")
const {
    getAllUser,
    deleteUser,
    updateUserVerification,
    getPendingTestResults,
    publishTestResults,
} = require("../controllers/admin/adminUserController");


router.route("/admin/get/emergencymedicine").get(findAllEmergencyList);
router.route("/admin/update/emergencymedicine/:id").post(emergencyMedicineUpdate);

router.route("/admin/get/unavailablemedicine").get(findAllUnailableList);
router.route("/admin/update/unavailablemedicine/:id").post(unavailableMedicineUpdate);

router.route("/api/v1/admin/getalluser").get(getAllUser);
router.route("/api/v1/admin/deleteuser").post(deleteUser);
router.route("/api/v1/admin/updateuserverification").post(updateUserVerification);
router.route("/api/v1/admin/getpendingtestresults").get(getPendingTestResults);
router.route("/api/v1/admin/publishtestresults").post(publishTestResults);

module.exports = router;

const express = require("express");

const{findAllEmergencyList,emergencyMedicineUpdate}=require("../controllers/admin/emergencyMedicineUpdate")
const{findAllUnailableList,unavailableMedicineUpdate}=require("../controllers/admin/unavailableMedicineUpdate")

const router = express.Router();

router.route("/admin/get/emergencymedicine").get(findAllEmergencyList);
router.route("/admin/update/emergencymedicine/:id").post(emergencyMedicineUpdate);

router.route("/admin/get/unavailablemedicine").get(findAllUnailableList);
router.route("/admin/update/unavailablemedicine/:id").post(unavailableMedicineUpdate);

module.exports = router;
const express = require("express");
const {
  newMedicalRecord,
  findAllMedicalRecord,
  findAllMedicalRecordByPin,
} = require("../controllers/medicalController");
const router = express.Router();

router.route("/api/v1/medical/new").post(newMedicalRecord);
router.route("/api/v1/medical/get/all").get(findAllMedicalRecord);
router.route("/api/v1/medical/get/:pin").get(findAllMedicalRecordByPin);

module.exports = router;

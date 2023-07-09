const express = require("express");
const {
  varifiyPrescutionForMedicineBooking,
  mlTest,
  scanPrescution,
  sentimentAnalysis,
} = require("../controllers/mlProcessingControllers");
const { upload } = require("../config/fileupload");
const router = express.Router();
router
  .route("/api/v1/ml/varify/prescution")
  .post(upload, varifiyPrescutionForMedicineBooking);

router.route("/api/v1/ml/test").post(mlTest);
router.route("/api/v1/ml/scan").post(upload, scanPrescution);
router.route("/api/v1/sentimentAnalysis").post(sentimentAnalysis);
module.exports = router;

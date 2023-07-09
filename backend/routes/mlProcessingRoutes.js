const express = require("express");
const {
  varifiyPrescutionForMedicineBooking,
  mlTest,
  scanPrescution,
  sentimentAnalysis,
  medicalChatBot,
} = require("../controllers/mlProcessingControllers");
const { upload } = require("../config/fileupload");
const router = express.Router();
router
  .route("/api/v1/ml/varify/prescution")
  .post(upload, varifiyPrescutionForMedicineBooking);

router.route("/api/v1/ml/test").post(mlTest);
router.route("/api/v1/ml/scan").post(upload, scanPrescution);
router.route("/api/v1/sentimentAnalysis").post(sentimentAnalysis);
router.route("/api/v1/medical/chatbot").post(medicalChatBot);
module.exports = router;

const express = require("express");
const {
  varifiyPrescutionForMedicineBooking,
  mlTest,
  scanPrescution,
  sentimentAnalysis,
  medicalChatBot,
  threatAnalysis,
  searchMedicineFromPrescution,
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
router.route("/api/v1/mdical/chatbot/threatAnalysis").post(threatAnalysis);
router
  .route("/api/v1/search/medicine")
  .post(upload, searchMedicineFromPrescution);
module.exports = router;

const express = require("express");
const getCombineDetailsFromPincode = require("../controllers/combineController");
const router = express.Router();

router
  .route("/api/v1/get/test-medicine-medical/:pin")
  .get(getCombineDetailsFromPincode);
module.exports = router;

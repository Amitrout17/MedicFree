const express = require("express");
const {
  testCenterRecord,
  findAllTestCenterRecord,
  findAllTestCenterRecordByPin,
} = require("../controllers/testCenterController");
const router = express.Router();

router.route("/api/v1/test/new").post(testCenterRecord);
router.route("/api/v1/test/get/all").get(findAllTestCenterRecord);
router.route("/api/v1/test/get/:pin").get(findAllTestCenterRecordByPin);

module.exports = router;

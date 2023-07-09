const express = require("express");
const {
  createNewRequest,
  getUserRequestMedicines,
} = require("../controllers/unavailableMedicineController");
const isAuthenticated = require("../middleware/auth");
const { upload } = require("../config/fileupload");

const router = express.Router();

router
  .route("/api/unavaibleMedicine/new")
  .post(isAuthenticated, upload, createNewRequest);
router
  .route("/api/unavaibleMedicine/get/:id")
  .get(isAuthenticated, getUserRequestMedicines);

module.exports = router;

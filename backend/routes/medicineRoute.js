const express = require("express");
const { upload } = require("../config/fileupload");
const {
  addMedicine,
  fetchAllMedicine,
  updateStock,
  storesInPincode,
  findstoreById,
  checkMedicines,
} = require("../controllers/medicineController");

const router = express.Router();

router.route("/api/v1/medicine/add").post(upload, addMedicine);
router.route("/api/v1/medicine/show").get(fetchAllMedicine);
router.route("/api/v1/medicine/updatestock").post(updateStock);
router.route("/api/v1/medicine/findstores").get(storesInPincode);
router.route("/api/v1/medicine/store/find/:id").get(findstoreById);
router.route("/api/v1/medicine/checkmedicines").post(checkMedicines);
module.exports = router;

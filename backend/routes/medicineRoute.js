const express = require("express");
const {
  addMedicine,
  fetchAllMedicine,
  updateStock,
  storesInPincode,
  findstoreById,
} = require("../controllers/medicineController");

const router = express.Router();

router.route("/api/v1/medicine/add").post(addMedicine);
router.route("/api/v1/medicine/show").get(fetchAllMedicine);
router.route("/api/v1/medicine/updatestock").post(updateStock);
router.route("/api/v1/medicine/findstores").get(storesInPincode);
router.route("/api/v1/medicine/store/find/:id").get(findstoreById);
module.exports = router;

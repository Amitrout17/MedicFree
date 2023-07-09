const express = require("express");
const {
  registerUser,
  varifyUser,
  loginUser,
  logout,
  loadUser,
  updateVerificationStatus,
} = require("../controllers/userController");
const { upload } = require("../config/fileupload");

const router = express.Router();

router.route("/api/v1/user/register").post(upload, registerUser);
router.route("/api/v1/user/varify/:id").post(varifyUser);
router
  .route("/api/v1/user/changevarifystatus/:id")
  .post(updateVerificationStatus);
router.route("/api/v1/user/login").post(loginUser);
router.route("/api/v1/user/logout").post(logout);
router.route("/api/v1/user/load").get(loadUser);

module.exports = router;

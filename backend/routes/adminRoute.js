const express = require("express");
const {
    getAllUser,
    deleteUser,
    updateUserVerification,
    getPendingTestResults,
    publishTestResults,
} = require("../controllers/admin/adminUserController");

const router = express.Router();

router.route("/api/v1/admin/getalluser").get(getAllUser);
router.route("/api/v1/admin/deleteuser").post(deleteUser);
router.route("/api/v1/admin/updateuserverification")
	.post(updateUserVerification);
router.route("/api/v1/admin/getpendingtestresults").get(getPendingTestResults);
router.route("/api/v1/admin/publishtestresults").post(publishTestResults);

module.exports = router;

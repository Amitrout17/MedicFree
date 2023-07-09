const exprees = require("express");
const {
  addUpdateLog,
  updateUserLog,
  getUserLogs,
} = require("../controllers/doctorEyeController");

const router = exprees.Router();

router.route("/api/v1/doctoreye/add").post(getUserLogs);
router.route("/api/v1/doctoreye/update/:id").post(updateUserLog);

module.exports = router;

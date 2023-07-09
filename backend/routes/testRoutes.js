//This routes is just made for testing purpose of different functionality
const {upload} = require("../config/fileupload");
const express = require("express");
const uploadDoc = require("../controllers/testController");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.route("/test/upload").post(upload, uploadDoc);

module.exports = router;

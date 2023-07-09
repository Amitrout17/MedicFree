const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./backend/uploads/");
  },

  filename: function (req, file, cb) {
    console.log("file details :");
    console.log(file);

    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).array("files");
module.exports = { upload };

const path = require("path");
const uploadDoc = async (req, res) => {
  try {
    if (req.files) {
      const files = req.files;
      if (files !== undefined) {
        const url = `http://localhost:${process.env.PORT}/uploads/${req.files[0].filename}`;
        console.log(url);
        res.status(200).json({
          meessage: "File uploaded sucessfully",
          url,
        });
      } else {
        res.status(200).json({
          message: "No file Present",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "some error occrured",
      error_message: error.message,
    });
  }
};

module.exports = uploadDoc;

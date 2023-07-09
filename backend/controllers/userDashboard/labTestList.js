const labTest = require("../../models/testBookDB");

exports.findAllLabTestDetails = async (req, res) => {
    try {
      const allLabTestRecords = await labTest.find({
        patientId: req.params.id,
      });
      res.status(200).json({
        sucess: true,
        allLabTestRecords,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
  };
const testCenterModel = require("../models/testCenterDB");

exports.testCenterRecord = async (req, res) => {
  try {
    const newMedicalRecord = await testCenterModel.create(req.body);
    res.status(200).json({
      sucess: true,
      newMedicalRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.findAllTestCenterRecord = async (req, res) => {
  try {
    const allMedicalRecords = await testCenterModel.find();
    res.status(200).json({
      sucess: true,
      allMedicalRecords,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.findAllTestCenterRecordByPin = async (req, res) => {
  try {
    const allMedicalRecords = await testCenterModel.find({
      pin: req.params.pin,
    });
    res.status(200).json({
      sucess: true,
      allMedicalRecords,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

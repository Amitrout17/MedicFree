const medicalModel = require("../models/medicalDB");

exports.newMedicalRecord = async (req, res) => {
  try {
    const newMedicalRecord = await medicalModel.create(req.body);
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

exports.findAllMedicalRecord = async (req, res) => {
  try {
    const allMedicalRecords = await medicalModel.find();
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

exports.findAllMedicalRecordByPin = async (req, res) => {
  try {
    const allMedicalRecords = await medicalModel.find({
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

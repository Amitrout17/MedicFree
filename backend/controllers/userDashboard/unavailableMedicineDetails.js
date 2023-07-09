const unavailabeMedicine = require("../../models/unavailabeMedicineDB");

exports.findAllUnavailableMedicineDetails = async (req, res) => {
    try {
      const allUnavailableMedicalRecords = await unavailabeMedicine.find({
        patientId: req.params.id,
      });
      res.status(200).json({
        sucess: true,
        allUnavailableMedicalRecords,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
  };
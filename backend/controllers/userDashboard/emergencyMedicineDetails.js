const emergencyMedicine = require("../../models/emergencyDB");

exports.findAllEmergencyMedicineDetails = async (req, res) => {
    try {
      const allEmergencyMedicalRecords = await emergencyMedicine.find({
        patientId: req.params.id,
      });
      res.status(200).json({
        sucess: true,
        allEmergencyMedicalRecords,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
  };
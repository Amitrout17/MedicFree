const unavailabeMedicine = require("../models/unavailabeMedicineDB");

exports.createNewRequest = async (req, res) => {
  try {
    console.log();
    var url = "";
    if (req.files) {
      const files = req.files;
      if (files !== undefined) {
        url = `http://localhost:${process.env.PORT}/uploads/${req.files[0].filename}`;
        console.log(url);
      }
    }

    const newRequest = await unavailabeMedicine.create({
      medicineName: req.body.medicineName,
      patientId: req.user._id,
      image: url,
    });

    res.status(200).json({
      sucess: true,
      newRequest: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal Server error",
      errorMessage: error.message,
    });
  }
};

exports.getUserRequestMedicines = async (req, res) => {
  try {
    const allRequest = await unavailabeMedicine.find({
      _id: req.params.id,
    });
    res.status(200).json({
      sucess: true,
      allRequest,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal Server error",
      errorMessage: error.message,
    });
  }
};

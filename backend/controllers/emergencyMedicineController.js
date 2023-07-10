const emergencyMedicine = require("../models/emergencyDB");
const sendEmail = require("../utils/sendEmergencyEmail");
const user = require("../models/userModel");

exports.createNewEmergencyRequest = async (req, res) => {
  try {
    console.log("code entering flow");
    var url = "";
    if (req.files) {
      const files = req.files;
      if (files !== undefined) {
        url = `http://localhost:${process.env.PORT}/uploads/${req.files[0].filename}`;
        console.log(url);
      }
    }

    const add = req.body.address ? req.body.address : req.user.address;

    const newRequest = await emergencyMedicine.create({
      medicineName: req.body.medicineName,
      patientId: req.user._id,
      patientName: req.user.name,
      address: add,
      image: url,
    });

    const allRequest = await user.find({
      role: "Admin",
    });

    const randomAdmin =
      allRequest[Math.floor(Math.random() * allRequest.length)];

    console.log(randomAdmin.email);

    const message = ` <h3>Medicine details: </h3>
                      <p>Medicine name: ${newRequest.medicineName}</p>
                      <p>Prescription URL: ${newRequest.image}</p>
                      <h3>Patient details: </h3>
                      <p>Patient name: ${newRequest.patientName}</p>
                      <p>Address: ${newRequest.address}</p>`;
    await sendEmail({
      email: randomAdmin.email,
      subject: `Emergency Medicine Request`,
      message,
    });
    //mail-> res

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

exports.getEmergencyRequestMedicines = async (req, res) => {
  try {
    const allRequest = await emergencyMedicine.find({
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

exports.getAdmin = async (req, res) => {
  try {
    const allRequest = await user.find({
      role: "Admin",
    });

    const randomAdmin =
      allRequest[Math.floor(Math.random() * allRequest.length)];
    res.status(200).json({
      sucess: true,
      randomAdmin,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal Server error",
      errorMessage: error.message,
    });
  }
};

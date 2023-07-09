const doctor = require("../models/DoctorDB");

exports.addDoctor = async (req, res) => {
  try {
    const newDoctor = await doctor.create(req.body);
    res.status(200).json({
      sucess: true,
      newDoctor,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.getDoctorBySpeciality = async (req, res) => {
  try {
    const allDoctors = await doctor.find({
      spaciality: req.params.spaciality,
    });
    res.status(200).json({
      sucess: true,
      allDoctors,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.scheduleDoctorAppointment=async(req,res)=>{
    const getDoctor=await doctor.findOne({
        
    })
}
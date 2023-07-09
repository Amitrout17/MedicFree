const doctor = require("../models/DoctorDB");
const appointment = require("../models/appointmentDb");
// Create a new Date object
var currentDate = new Date();

// Get the current day (0-6)
var day = currentDate.getDay();

// Get the current date (1-31)
var date = currentDate.getDate();

// Get the current year (yyyy)
var year = currentDate.getFullYear();

// Get the current time in 24-hour format (hh:mm:ss)
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();

// Format the time values to always have two digits
hours = ("0" + hours).slice(-2);
minutes = ("0" + minutes).slice(-2);
seconds = ("0" + seconds).slice(-2);

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

exports.scheduleDoctorAppointment = async (req, res) => {
  try {
    const getDoctor = await doctor.findOne({
      _id: req.params.id,
    });

    if (!getDoctor) {
      const newrecord = await appointment.create({
        doctorId: req.body.doctorId,
        patientId: req.user.id,
        time: `${hours}:${minutes}`,
        day,
        month,
        year,
      });
      return res.status(200).json({
        sucess: true,
        newrecord,
      });
    } else {
      //here i want to update the exist time in latest record by 30 min
      const latstAppointment = getDoctor.appointments[0];

      console.log(latstAppointment);

      const newRecord = await appointment.create({
        doctorId: req.body.doctorId,
        patientId: req.user.id,
        time: `${hours}:${minutes}`,
        day,
        month,
        year,
      });
    }

/*     const docAppointment = getDoctor.appointments[0];
    const [hours, minutes] = time.split(":").map(Number);
 */  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

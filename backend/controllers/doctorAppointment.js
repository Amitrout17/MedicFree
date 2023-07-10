const doctor = require("../models/DoctorDB");
const appointment = require("../models/appointmentDb");
const userModel = require("../models/userModel");

var currentDate = new Date();

// Get the current date (1-31)
var date = currentDate.getDate();

// Get the current month (0-11, where 0 represents January)
var month = currentDate.getMonth() + 1; // Adding 1 to align with the usual month numbering (1-12)

// Get the current year (yyyy)
var year = currentDate.getFullYear();

//hard code value
// Function to generate a random 24-hour time
function getRandom24HourTime() {
  // Generate random hour (0-23)
  const hour = Math.floor(Math.random() * 24);

  // Generate random minute (0-59)
  const minute = Math.floor(Math.random() * 60);

  // Format the time as a string
  const time = `${padZero(hour)}:${padZero(minute)}`;

  return time;
}

// Function to pad zero to single-digit numbers
function padZero(number) {
  return number.toString().padStart(2, "0");
}

// Example usage
const randomTime = getRandom24HourTime();

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
      _id: req.params.doctorId,
    });

    console.log(req.params.doctorId);

    if (getDoctor.appointments.length === 0) {
      const newrecord = await appointment.create({
        doctorId: req.params.doctorId,
        patientId: req.user.id,
        time: `10 : 30`,
        date,
        month,
        year,
      });

      //now need to update in doctor db also:

      const newApp = {
        time: `10 : 30`,
        date: `${date}-${month}-${year}`,
      };

      const newArr = [newApp];

      getDoctor.appointments = newArr;
      await getDoctor.save();
      //doctor updation completed
      return res.status(200).json({
        sucess: true,
        newrecord,
      });
    } else {
      //here i want to update the exist time in latest record by 30 min
      const latstAppointment =
        getDoctor.appointments[getDoctor.appointments.length - 1];

      const recentTime = latstAppointment.time;

      var timeParts = recentTime.split(":");

      // Extract the hours and minutes
      var hours = parseInt(timeParts[0]);
      var minutes = parseInt(timeParts[1]);

      minutes = minutes + 30;
      if (minutes >= 60) {
        minutes = "00";
        hours++;
      }

      const randomTime = getRandom24HourTime();

      const newRecord = await appointment.create({
        doctorId: req.params.doctorId,
        patientId: req.user.id,
        time: randomTime,
        date,
        month,
        year,
      });

      //now update in doctor appointment also
      const prev = getDoctor.appointments;
      var newApp = [
        ...prev,
        {
          date: `${date}-${month}-${year}`,
          time: randomTime,
        },
      ];
      getDoctor.appointments = newApp;
      await getDoctor.save();

      return res.status(200).json({
        sucess: true,
        newRecord,
        getDoctor,
      });
    }

    /*     const docAppointment = getDoctor.appointments[0];
    const [hours, minutes] = time.split(":").map(Number);
 */
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.getPerticularAppointment = async (req, res) => {
  try {
    const getRecord = await appointment.findOne({
      _id: req.params.id,
    });

    const doc = await doctor.findOne({
      _id: getRecord.doctorId,
    });

    res.status(200).json({
      getRecord,
      doc,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.getMyappointment = async (req, res) => {
  try {
    const allAppointment = await appointment.find({
      patientId: req.params.id,
    });

    result = [];
    for (let i of allAppointment) {
      const doctorobj = await doctor.find({_id: i.doctorId});
      const doctorname = doctorobj[0].name;
      i.doctorname = doctorname
      result.push(i);
    }

    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

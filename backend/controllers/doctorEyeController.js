const { default: axios } = require("axios");
const doctorEye = require("../models/doctorEye");

const time = new Date().toLocaleTimeString("en-US", {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
});

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;

exports.getUserLogs = async (req, res) => {
  try {
    const userLogs = await doctorEye.find({
      _id: req.params.id,
    });
    res.status(200).json({
      userLogs,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.updateUserLog = async (req, res) => {
  try {
    const findUser = await doctorEye.findOne({
      _id: req.params.id,
    });

    const message = req.body.message;

    var result = "Non Determinable / Normal";

    await axios
      .post("http://localhost:4000/api/v1/mdical/chatbot/threatAnalysis", {
        message,
      })
      .then((res) => {
        result = res.data.result;
      })
      .catch((res) => {
        result = "Medium";
      });

    const addRecord = await doctorEye.create({
      patientId: req.params.id,
      logs: {
        message,
        aiConclusion: result,
        time,
        date: currentDate,
      },
    });

    return res.status(200).json({
      success: true,
      addRecord,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

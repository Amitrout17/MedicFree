const testCenterDB = require("../../models/testCenterDB");
const testBookingDb = require("../../models/testBookDB");
exports.getAvailabletest = async (req, res) => {
  try {
    const getTestList = await testCenterDB.findOne({
      _id: req.params.id,
    });
    res.status(200).json({
      sucess: true,
      test: getTestList.test,
    });
  } catch (error) {
    res.status(500).json({
      messagee: "Internal server error",
      erorMessage: error.message,
    });
  }
};

exports.bookNewLabTest = async (req, res) => {
  try {
    let newDay, newMonth, newYear;

    const fetchRecord = await testBookingDb.find().sort({ _id: -1 });
    const latestRecord = fetchRecord[0];

    if (!latestRecord) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Month value is zero-based, so we add 1
      const currentYear = currentDate.getFullYear();
      const currentDay = currentDate.getDate();

      const newRecord = await testBookingDb.create({
        testName: req.body.testName,
        testDetails: req.body.testDetails,
        patientId: req.user._id,
        testCenterId: req.params.testCenterId,
        testId: req.params.testId,
        day: currentDay,
        month: currentMonth,
        year: currentYear,
        time: "10:30",
      });

      return res.status(200).json({
        sucess: true,
        newRecord,
      });
    }

    if (latestRecord) {
      const { time, day, month, year } = latestRecord;

      const [hours, minutes] = time.split(":").map(Number);

      if (hours > 23 || hours === 23) {
        nextTime = "10:30";
        let nextDay = day + 1;
        let nextMonth = month;
        let nextYear = year;

        if (nextDay >= 30) {
          nextDay = 1;
          nextMonth += 1;
          if (nextMonth > 12) {
            nextMonth = 1;
            nextYear += 1;
          }
        }

        newDay = nextDay;
        newMonth = nextMonth;
        newYear = nextYear;

        const newRecord = await testBookingDb.create({
          testName: req.body.testName,
          testDetails: req.body.testDetails,
          patientId: req.user._id,
          testCenterId: req.params.testCenterId,
          testId: req.params.testId,
          day: newDay,
          month: nextMonth,
          year: newYear,
          time: nextTime,
        });

        res.status(200).json({
          sucess: true,
          newRecord,
        });
      } else {
        const currentTime = new Date();
        currentTime.setHours(hours);
        currentTime.setMinutes(minutes + 30);
        const updatedHours = currentTime.getHours();
        const updatedMinutes = currentTime.getMinutes();
        nextTime = `${updatedHours.toString().padStart(2, "0")}:${updatedMinutes
          .toString()
          .padStart(2, "0")}`;

        newMonth = month;
        newYear = year;
        newDay = day;

        const newRecord = await testBookingDb.create({
          testName: req.body.testName,
          testDetails: req.body.testDetails,
          patientId: req.user._id,
          testCenterId: req.params.testCenterId,
          testId: req.params.testId,
          day: newDay,
          month: newMonth,
          year: newYear,
          time: nextTime,
        });

        res.status(200).json({
          sucess: true,
          newRecord,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      messagee: "Internal server error",
      erorMessage: error.message,
    });
  }
};

exports.getScheduleDetails = async (req, res) => {
  try {
    const testDetails = await testBookingDb.findOne({
      _id: req.params.id,
    });
    res.status(200).json({
      sucess: true,
      testDetails,
    });
  } catch (error) {
    res.status(500).json({
      messagee: "Internal server error",
      erorMessage: error.message,
    });
  }
};

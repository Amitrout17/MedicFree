const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//config file
require("dotenv").config();

const app = express();

//Request body setup
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

//cookies setup
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "./backend/uploads")));
console.log(path.join(__dirname, "/uploads"));

//for sending files

app.get("/uploads/:file", (req, res) => {
  try {
    const filePath = path.join(__dirname, `./uploads/${req.params.file}`);
    console.log(filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});

//user routes
const userRoute = require("./routes/userRoute");
app.use(userRoute);

//medicine router
const medicineRoute = require("./routes/medicineRoute");
app.use(medicineRoute);

//medical router
const medicalRouter = require("./routes/medicalRouter");
app.use(medicalRouter);

//test center routes
const testCenterRoutes = require("./routes/testCenterRoutes");
app.use(testCenterRoutes);

//common router
const combineRouter = require("./routes/combineRouter");
app.use(combineRouter);

//unavailalbe medicine routes
const unavailabelMedicineRoutes = require("./routes/unavailableRoutes");
app.use(unavailabelMedicineRoutes);

//testing routes
const testRoutes = require("./routes/testRoutes");
app.use(testRoutes);

//ml routes
const mlRoutes = require("./routes/mlProcessingRoutes");
app.use(mlRoutes);

//booking routes
const bookingRoutes = require("./routes/bookingRoutes");
app.use(bookingRoutes);

//emergency routes
const emergencyMedicinceRoutes = require("./routes/emergencyMedicineRoutes");
app.use(emergencyMedicinceRoutes);

//user dashboard routes
const userDashboardRoutes = require("./routes/userDasboardRoute");
app.use(userDashboardRoutes);

//admin routes
const adminRoute = require("./routes/adminRoute");
app.use(adminRoute);

const doctorRoute = require("./routes/doctorRoutes");
app.use(doctorRoute);

module.exports = app;

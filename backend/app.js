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
const adminRoute = require("./routes/adminRoute");
app.use(adminRoute);

module.exports = app;

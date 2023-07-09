const mongoose = require("mongoose");

const connectDatabase = () => {
  //connecting to the database

  mongoose.connect(process.env.DB_URI).then(() => {
    console.log("server connected sucessfully");
  }).catch((error)=>{
    console.log("can not connect to server")
    console.log(error.message)
  });
};

module.exports = connectDatabase;

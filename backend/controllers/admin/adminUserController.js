/* Admin Dashboard Backend */

/* Improvements:
    1. testbookDB resultStatus parameter can be boolean instead of string.
*/

// import user model
const user = require("../../models/userModel");
const testbook = require("../../models/testBookDB");

// ability to fetch all user and show to admin
exports.getAllUser = async(req, res) => {
    try{
        const reqUser = await user.find({ role: 'user' });
        
        res.status(200).json({
            message: "Fetch successful",
            users: reqUser,
        });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
};

// ability to delete user by ID
// (after fetching all the users from users API)
exports.deleteUser = async(req, res) => {
    try{
        const reqUser = await user.findOneAndDelete({ _id: req.body.id });
        res.status(201).json({
            message: "Deleted user",
            user: reqUser,
        });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
};

// ability to change the verification of the user
// (change from true to false and vice-versa).
exports.updateUserVerification = async(req, res) => {
    try{
        const reqUser = await user.findByIdAndUpdate(
            req.body.id,
            { varified: req.body.status }
            );
        
        res.status(200).json({
            message: "Update verification successful",
            user: reqUser,
        });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
};

// ability to get all the users whose result status is pending
exports.getPendingTestResults = async(req, res) => {
    try{
        const getTestResults = await testbook.find();
        
        console.log(getTestResults)
        res.status(200).json({
            message: "Published test results",
            getTestResults,
        });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
};

exports.processingTestResults = async(req, res) => {
  try{
      const updateTestResult = await testbook.findByIdAndUpdate(
          req.body.id,
          { resultStatus: 'processing' });
      res.status(200).json({
          message: "Published test results",
          updateTestResult,
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

// ability to update test results of the user
// (
//  1. change status from processing to published
//  2. upload prescription of lab test
//  )
exports.publishTestResults = async(req, res) => {
    try{

      var url = "";
    if (req.files) {
      const files = req.files;
      if (files !== undefined) {
        url = `http://localhost:${process.env.PORT}/uploads/${req.files[0].filename}`;
        console.log(url);
      }
    }
        const updateTestResult = await testbook.findByIdAndUpdate(
            req.body.id,
            { resultStatus: 'published', resultDocument: url });
        res.status(200).json({
            message: "Published test results",
            updateTestResult,
        });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
};
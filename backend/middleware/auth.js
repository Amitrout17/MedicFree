const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "please login First",
      });
    }
    if (token === "logout") {
      return res.status(401).json({
        sucess: false,
        message: "Please login for accessing",
      });
    } else {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedData.id);
      next();
    }
  } catch (error) {
    error.message;
  }
};

module.exports = isAuthenticated;

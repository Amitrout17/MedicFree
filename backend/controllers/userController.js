const user = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const JWT = require("jsonwebtoken");


exports.registerUser = async (req, res) => {
  try {
    const finduser = await user.findOne({
      email: req.body.email,
    });

    if (finduser) {
      return res.status(403).json({
        sucess: false,
        message: "user already exist",
      });
    }

    const newUser = await user.create(req.body);

    const jwtData = {
      id: newUser._id,
    };

    const token = JWT.sign(jwtData, process.env.JWT_SECRET);

    res.status(201).cookie("token", token).json({
      sucess: true,
      newUser,
      JWT_Token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Plz Enter Email & Password",
      });
    }

    const User = await user.findOne({ email: email });

    if (!User) {
      return res.status(404).json({
        message: "user does not exist please register user",
      });
    }

    if (User.password == password) {
      const jwtData = {
        id: User._id,
      };

      const token = JWT.sign(jwtData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      res.cookie("token", token);
      res.status(201).json({
        sucess: true,
        User,
        JWT_Token: token,
      });
    } else {
      res.status(401).json({
        message: "Wrong password, Try again",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

//Logout user
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "logout");

    res.status(200).json({
      sucess: true,
      message: "Logged Out sucessfully",
    });
  } catch (error) {
    error;
  }
};

exports.varifyUser = async (req, res) => {
  try {
    const User = await user.findOne({
      _id: req.params.id,
    });

    function varificationCodeGenerator() {
      var minm = 10000;
      var maxm = 99999;
      return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    }

    const varificationCode = varificationCodeGenerator();

    const message = `${varificationCode}`;

    await sendEmail({
      email: User.email,
      subject: `User Varification `,
      message,
    });

    res.status(200).json({
      message: "email send sucessfully",
      varificationCode: varificationCode,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.updateVerificationStatus = async (req, res) => {
	try {
		const updateStatus = await user.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				$set: { varified: true }
			},
			{
				"new": true
			},
		);

		res.status(200).json({
			success: true,
			updateStatus,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			errorMessage: error.message,
		});
	}
};

exports.loadUser = async (req, res) => {
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
      const decodedData = JWT.verify(token, process.env.JWT_SECRET);
      const UserData = await user.findById(decodedData.id);
      res.status(200).json({
        sucess: true,
        UserData,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

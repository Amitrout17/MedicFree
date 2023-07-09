const user = require("../../models/userModel");

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const conditions = {
      _id: userId,
    };
    const updateUser = await user.findOne(conditions);

    res.status(200).json({
      sucess: true,
      updateUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.userProfileUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    const conditions = {
      _id: userId,
    };
    const update = {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
			age: req.body.age,
    };
    
    const updateUser = await user.findOneAndUpdate(conditions, update, {
      new: true,
    });

    res.status(200).json({
      sucess: true,
      updateUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

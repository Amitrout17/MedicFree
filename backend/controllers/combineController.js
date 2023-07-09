const medicalModel = require("../models/medicalDB");
const testCenterModel = require("../models/testCenterDB");
const medicineItem = require("../models/medicineModel");
getCombineDetailsFromPincode = async (req, res) => {
  try {
    const medicalList = await medicalModel.find({
      pin: req.params.pin,
    });
    const testList = await testCenterModel.find({
      pin: req.params.pin,
    });

    const stores = await medicineItem.find({
      pin: req.body.pin,
    });

    const medList = [];

    stores.map((item) => {
      item.medicine.map((i) => {
        var obj = {};
        obj.name = i.name;
        obj.category = i.category;
        obj.image = i.image;
        obj.store_id = item._id;
        obj.stock = i.stock;
        obj.medicineId = i._id;
        medList.push(obj);
      });
    });

    res.status(200).json({
      sucess: true,
      testList,
      medicalList,
      medicineList: medList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

module.exports = getCombineDetailsFromPincode;

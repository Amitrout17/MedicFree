const medicineItem = require("../models/medicineModel.js");

exports.addMedicine = async (req, res) => {
  try {
    const findmedicine = await medicineItem.find({
      storeName: req.body.storeName,
      address: req.body.address,
      pinCode: req.body.pinCode,
    });

    if(findmedicine === null) {

      findmedicine.save((err, updatedDocument) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ sucess: true, updatedDocument });
        }
      });
    }

    let medicinePresent = false;
    findmedicine.map((item) => {
      if (item.name === req.body.medicine.name) {
        medicinePresent = true;
      }
    });
    if (medicinePresent) {
      return res.status(403).json({
        success: false,
        message: "medicine already exists",
      });
    }

    const newMedicine = {
      ...findmedicine,
      medicine: [...findmedicine.medicine, req.body.medicine],
    };
    console.log(newMedicine);

    newMedicine.save((err, updatedDocument) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ sucess: true, updatedDocument });
      }
    });
  } catch (error) {
    res.status(500).json({
      sucess:false,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.checkMedicines = async(req, res) => {
  const medicineArray = req.body.medicinelist;

  var medicines = [];
  try{
    const medicinenames = await medicineItem.distinct("medicine");
    console.log(medicinenames);
    medicinenames.map((item) => {
      medicineArray.map(i => {
        if(i === item.name && item.stock > 0) {
          medicines.push(item);
        }
      });
    });
    res.status(200).json({
      result: "success",
      medicines
    });
  } catch(error) {
    res.status(500).json({
      result: "failed",
      err: error.message,
    })
  }
}

exports.fetchAllMedicine = async (req, res) => {
  try {
    const allMedicines = await medicineItem.distinct("medicine");

    res.status(200).json({
      success: true,
      allMedicines,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const medicineToUpdate = await medicineItem.findOneAndUpdate(
      {
        storeName: req.body.storeName,
        "medicine.name": req.body.medicine.name,
        address: req.body.address,
        pinCode: req.body.pinCode,
      },
      {
        $set: { "medicine.$.stock": req.body.medicine.stock },
      }
    );

    res.status(200).json({
      success: true,
      medicineToUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

//to find medicines availabe in the pin code along with therir storeid
exports.storesInPincode = async (req, res) => {
  try {
    /* const medicines = await medicineItem.distinct("medicine", {
      pinCode: req.body.pinCode,
    });

    res.status(200).json({
      success: true,
      medicines,
    }); */

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
        obj.medicineId = i._id;
        medList.push(obj);
      });
    });

    res.status(200).json({
      success: true,
      medList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

exports.findstoreById = async (req, res) => {
  try {
    const store = await medicineItem.find({
      _id: req.params.id,
    });
    res.status(200).json({
      sucess: true,
      store,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

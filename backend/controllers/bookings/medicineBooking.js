const medicineModel = require("../../models/medicineModel");
const medicineOrder = require("../../models/medicineOrders");
exports.bookMedicine = async (req, res) => {
  try {
    console.log(req.body.medicineId);

    const record = await medicineModel.findOne({ _id: req.body.storeId });
    if (!record) {
      console.log("Medicine not found");
      return;
    }

    const responseData = {};

    var stock;

    record.medicine.map((item) => {
      if (item.id === req.body.medicineId) {
        (responseData.medicineName = item.name),
          (responseData.category = item.category),
          (responseData.image = item.image);
        stock = item.stock;
        responseData.storeName = record.storeName;
        responseData.address = record.address;
        responseData.StoreImage = record.image;
        responseData.pinCode = record.pinCode;
      }
    });

    //now we need to update the medicine stock :
    const filter = {
      _id: req.body.storeId,
      "medicine._id": req.body.medicineId,
    };
    const update = { $set: { "medicine.$.stock": stock - 1 } };
    const options = { new: true };

    const updatedStore = await medicineModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    //now need to add record in medicine order db
    /* const newOrder = medicineOrder.create({
      patientId: req.user.id,
    }); */

    const newOrder = await medicineOrder.create({
      patientId: req.user.id,
      medicineId: req.body.medicineId,
      storeId: req.body.storeId,
    });

    res.status(200).json({
      success: true,
      responseData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

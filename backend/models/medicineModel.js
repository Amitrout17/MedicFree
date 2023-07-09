const mongoose = require("mongoose");

const medicineScheema = new mongoose.Schema({
  storeName: {
    type: String,
    require: [true, "Enter Store Name"],
  },
  medicine: [
    {
      name: {
        type: String,
        required: [true, "Enter Medicine Name"],
      },
      stock: {
        type: Number,
        required: [true, "Enter Stock for the medicine"],
      },
      category: {
        type: String,
        required: [true, "Enter The medicine category"],
      },
      image: {
        type: String,
      },
    },
  ],
  address: {
    type: String,
    required: [true, "Enter the adderss"],
  },
  pinCode: {
    type: Number,
    required: [true, "Enter the pincode of the store"],
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("medicineModel", medicineScheema);

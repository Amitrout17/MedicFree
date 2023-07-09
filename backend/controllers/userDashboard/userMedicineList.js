const medicineOrder = require("../../models/medicineOrders");
const medicineList = require("../../models/medicineModel");
const { all } = require("axios");

exports.findAllMedicineList = async (req, res) => {
  try {
    const allMedicineList = await medicineOrder.find({
      patientId: req.params.id,
    });

    var arr = [];

    for (const item of allMedicineList) {
      const storelist = await medicineList.findOne({ _id: item.storeId });
      arr.push(...storelist.medicine);
    }

    const uniqueArr = Object.values(
      arr.reduce((unique, item) => {
        const key = JSON.stringify(item);
        if (!unique[key]) {
          unique[key] = item;
        }
        return unique;
      }, {})
    );
    

    var medicineTaken = [];

  
    await Promise.all(
      allMedicineList.map(async (item) => {
        uniqueArr.map((i) => {
          if (item.medicineId.toString() === i._id.toString()) {
            medicineTaken.push(i);
          }
        });
      })
    ).then((r) => {
      res.status(200).json({
        success: true,
        medicineTaken,
        arr,
        allMedicineList
      });
    });

    /* for(const item of allMedicineList) {
      for(const i in arr) {
      if (item.medicineId === i._id) {
        console.log(typeof i);
        medicineTaken.push('hello');
      }
     }
    }; */
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};

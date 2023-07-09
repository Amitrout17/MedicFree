
const emergencyMedicine= require("../../models/emergencyDB");

exports.findAllEmergencyList= async(req,res)=>{
    try{
    const emergencyMedicineList= await emergencyMedicine.find({
        Availabilitystatus:{$ne:"Delivered"}});

        res.status(201).json({
            sucess: true,
            emergencyMedicineList,
            
          });

        }catch (error) { 
            res.status(500).json({
              message: "Internal server error",
              errorMessage: error.message,
            });
          }
};


exports.emergencyMedicineUpdate=async(req,res)=>{
  try{   
    // const update={ Availabilitystatus:"approved"}
    
    //     const emergencyMedicineStatusUpdate= await emergencyMedicine.findOneAndUpdate(filter,update)
    //     res.status(201).json({
    //         sucess: true,
    //         emergencyMedicineStatusUpdate,
            
    //       });
     const result= await emergencyMedicine.findOne({_id:req.body.id})
        result.Availabilitystatus=req.body.status;
         await result.save();
         res.status(200).json({
                  sucess: true,
                 result,
                  
                })

    } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          errorMessage: error.message,
        });
      }
}
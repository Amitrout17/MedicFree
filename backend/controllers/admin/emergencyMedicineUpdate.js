
const emergencyMedicine= require("../../models/emergencyDB");

exports.findAllEmergencyList= async(req,res)=>{
    try{
    const emergencyMedicineList= await emergencyMedicine.find({
        Availabilitystatus:"pending"});

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
     const result= await emergencyMedicine.findOne({_id:req.params.id})
        result.Availabilitystatus='approved';
         await result.save();
         res.status(201).json({
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
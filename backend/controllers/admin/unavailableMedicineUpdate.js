const unavailableMedicine= require("../../models/unavailabeMedicineDB");

exports.findAllUnailableList= async(req,res)=>{
    try{
    const unavailableMedicineList= await unavailableMedicine.find({
        Availabilitystatus:"pending"});

        res.status(201).json({
            sucess: true,
            unavailableMedicineList,
            
          });

        }catch (error) {
            res.status(500).json({
              message: "Internal server error",
              errorMessage: error.message,
            });
          }
};


exports.unavailableMedicineUpdate=async(req,res)=>{
  try{   
   
     const result= await unavailableMedicine.findOne({_id:req.body.id})
        result.Availabilitystatus=req.body.status;
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
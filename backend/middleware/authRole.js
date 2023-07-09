const authrole=(req,res,next)=>{
    if(req.user.role=="admin"){
        next();
    }
    else{
        return res.status(403).json({
            message:`Role: ${req.user.role}, is not allowed to access this resource`
        });
    }
}
module.exports=authrole;
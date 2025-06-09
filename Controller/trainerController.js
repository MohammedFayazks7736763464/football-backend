const trainer=require('../Model/trainerSchema')
const jwt=require('jsonwebtoken')


/// trainer register
exports.trainerregister=async(req,res)=>{


    const{trainername,email,password,phonenumber}=req.body

    console.log(trainername,email,password,phonenumber);
    

    console.log("inside the trainerRegister function");

    try {

     const existingtrainer=await trainer.findOne({email})
     
     if(existingtrainer){
        res.status(406).json(existingtrainer)
     }else{
        const newtrainer=new trainer({
            trainername,email,password,phonenumber
        })
        await newtrainer.save()
    
        res.status(200).json(newtrainer)
     }

    } catch (error) {

        res.status(401).json(error)
        
    }
    

}


/// trainer login


exports.trainerlogin=async(req,res)=>{

    const{email,password}=req.body
    console.log(email,password);
    

    console.log("inside the function of trainer login");

    try {


    const existingtrainer=await trainer.findOne({email,password})  
    
    if(existingtrainer){

        // token verification

        const token=jwt.sign({userId:existingtrainer._id},process.env.jwt_string)
        res.status(200).json({existingtrainer,token})

    }else{

        res.status(406).json("invalid email and password")

    }
       
    } catch (error) {
        res.status(401).json(error)
        
    }
    

}



/// get all trainers

exports.getalltrainers=async(req,res)=>{
    try {

        const getalltrainers=await trainer.find()

    res.status(200).json(getalltrainers)
        
        
    } catch (error) {

        res.status(401).json(error)
        
    }
}
/// get all trainers in admin page

exports.getalltrainersinadmin=async(req,res)=>{
    try {

        const getalltrainers=await trainer.find()
          .populate('classId', 'classname price trainername') // optional: get class name too

    res.status(200).json(getalltrainers)
        
        
    } catch (error) {

        res.status(401).json(error)
        
    }
}




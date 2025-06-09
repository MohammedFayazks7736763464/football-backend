const admin=require('../Model/adminSchema')

/// register admin


exports.adminregiter=async(req,res)=>{
    console.log("inside admin register function");

    const{adminname,email,password,phonenumber}=req.body
    
    try {

        const existingadmin=await admin.findOne({email})
        if(existingadmin){
            res.status(406).json("admin already exist")
        }else{
            const newadmin= new admin({
                adminname,email,password,phonenumber
            })
            await newadmin.save()
            res.status(200).json(newadmin)
        }
        
    } catch (error) {

        res.status(401).json(error)
        
    }
    

}
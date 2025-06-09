const mongoose=require("mongoose")


const adminSchema=mongoose.Schema({

    adminname:{
        type:String,
        required:true
},
    email:{
       type:String,
       required:true,
       unique:true
},

    password:{
       type:String,
       required:true
},

    phonenumber:{
       type:Number,
       required:true
}

})


const admin=mongoose.model("admin",adminSchema) 
module.exports=admin
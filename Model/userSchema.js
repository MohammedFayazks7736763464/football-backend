const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    username:{
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
    },
    // isadmin:{                          ///// admin
    // type:Boolean,
    // default:false
    // }
    position:{
        type:String
    },
    profilephoto:{
        type:String
    }
    
})

const users=mongoose.model("users",userschema) 
module.exports=users
const mongoose=require("mongoose")


const trainerSchema=mongoose.Schema({

    trainername:{
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
classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
    required: true,
  },

})


const trainer=mongoose.model("trainer",trainerSchema) 
module.exports=trainer
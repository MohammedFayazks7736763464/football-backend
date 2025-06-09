const mongoose=require('mongoose')


const selectclassschema=mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    classId:{
        type:String,
        required:true,
    },
    createdAt:{
    type:Date,
    default:Date.now
    }
})


const selectedclass=mongoose.model("selectedclass",selectclassschema)
module.exports=selectedclass
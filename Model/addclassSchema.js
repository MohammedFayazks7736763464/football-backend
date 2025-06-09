const mongoose=require('mongoose')

const addclassSchema=mongoose.Schema({
    classname:{
    type:String,
    required:true,
    unique:true
    },

    thumbnail:{
    type:String,
    required:true,
    
    },
    video:{
        type:String,
        required:true
    },

    trainername:{
    type:String,
    required:true,
    
    },

    email:{
     type:String,
    required:true,
    // unique:true
    },
    seats:{
    type:Number,
    required:true,
        
    },
    price:{
    type:Number,
    required:true,
            
    },
    description:{
     type:String,
    required:true,
                
    },
    userId:{            ///// add userid to database because for understanding each user who add there project
    type:String,
    required:true
    },
    status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
    },
    message:{
        type:String,
        
    },
    duration:{
        type:String,
    },
    createdAt:{
    type:Date,
    default:Date.now
    }
   

   
})



const classes=mongoose.model("classes",addclassSchema)
module.exports=classes
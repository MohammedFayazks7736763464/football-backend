
const mongoose=require('mongoose')

const connection_string=process.env.connection_string


mongoose.connect(connection_string).then(()=>{
    console.log("football server successfully connected to mongodb");
    

}).catch((err)=>{
    console.log(`connection failed${err}`);
    
})



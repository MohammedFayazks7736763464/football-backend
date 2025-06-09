require('dotenv').config()

const express=require('express') 

const cors=require('cors')

const router=require('./Router/router')

require('./DB/connection')



////  create server

const fserver=express()   ///  our server name is fserver
fserver.use(cors())
fserver.use(express.json())
fserver.use('/uploads',express.static('./uploads'))   /// for get images express.static is the method of express for exporting
fserver.use(router)




///

const PORT=4000   ||  process.env.PORT



fserver.listen(PORT,()=>{
    console.log(`fserver successfully running at PORT ${PORT} `);
    
})

fserver.get('/',(req,res)=>{
    res.send("f server application successfully running")
})


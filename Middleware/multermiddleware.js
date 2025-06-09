const multer=require('multer')


  ////  storage location for our  uploading image

  const storage=multer.diskStorage({      ////  crate a storage to upload image so we use diskstorage method 
    destination:(req,file,callback)=>{       ////  then crate a destination to store our image
        callback(null,'./uploads')  ///  create  a file to store images ///  call back uses for creating delay because it is asynchronous operation
    },

    filename:(req,file,callback)=>{   ///  key how to upload image,location
        const filename=`image-${Date.now()}-${file.originalname}`  ///  get date and file orginal name that we uploaded
        callback(null,filename)


    }
    
  

  })   
  ////   then  create  filefilter to identify or filter that we uploaded files are  image/png etc   it is in proper format that we already done in front end

  //// in this use mime method to find type


  const filefilter=(req,file,callback)=>{

    if(file.mimetype=="image/png"  || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" ||file.mimetype=="video/mp4" ||file.mimetype== "video/quicktime"||file.mimetype== "video/x-msvideo"||file.mimetype=="video/x-matroska" ){    ///  filter types

        callback(null,true)    ////  if true return true

    }else{

         callback(null,false)   ///  if false return false
 
         return callback(new Error("please upload following file extension format (jpg/jpeg/png/mp4/mov/avi/mkv)"))    /// also display the error message
  
    }
  }


  //// last step create config to exporting

  const multerConfig=multer({

    storage,filefilter

  })

  module.exports=multerConfig   ///  export it 
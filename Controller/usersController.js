const users=require('../Model/userSchema')
const jwt=require('jsonwebtoken')
const feedback=require('../Model/FeedbackSchema');



exports.register=async(req,res)=>{
    console.log("inside the registration function");


    const{username,email,password,phonenumber,}=req.body
    console.log(username,email,password,phonenumber);
    
    
    try {

        const existinguser=await users.findOne({email})

        if(existinguser){
            res.status(406).json("user already exist")
        }else{
            /// admin
            // const adminemail=["admin@gmail.com"]
            // const isadmin=adminemail.includes(email)
             

            const newUsers=new users({
                username,email,password,phonenumber,position:"",profilephoto:""
            })
            await newUsers.save()  ///  save the data into database
            res.status(200).json(newUsers)
        }     
       
} catch (err) {


        res.status(401).json(err)
        
    }
    
}



//// login 

exports.login=async(req,res)=>{

    console.log("inside the login function");

    const{email,password}=req.body
    


    try {

        const existinguser=await users.findOne({email,password})

        if(existinguser){

        const token=jwt.sign({userId:existinguser._id},process.env.jwt_string)

        res.status(200).json({existinguser,token})

        }else{

        res.status(406).json("wrong email and password")

        }
        
    } catch (err) {
        res.status(401).json(err)
        
    }




    console.log(email,password);

    

    

}

/// admin


// exports.makeAdmin = async (req, res) => {
//     const { userIdToMakeAdmin } = req.body;
  
//     try {
//       const user = await users.findById(userIdToMakeAdmin);
//       if (!user) {
//         return res.status(404).json("User not found");
//       }
  
//       user.isadmin = true;
//       await user.save();
  
//       res.status(200).json({ message: "User promoted to admin successfully", user });
//     } catch (err) {
//       console.error("Error promoting user to admin:", err);
//       res.status(500).json("Internal Server Error");
//     }
//   };




  /// get all users


  exports.getallusers=async(req,res)=>{
    console.log("inside the function of all get all users");

    try {
        
        const getusers=await users.find()
        res.status(200).json(getusers)
        
    } catch (err) {
        res.status(500).json(err)
        
    }
    
  }



  ///get all users in admin manage users

  exports.getallusersinadmin = async (req, res) => {
    console.log("inside the get all users in admin manage users");
  
    try {
      const getusersinadmin = await users.find(); // ✅ only non-admins    { isadmin: false }
      res.status(200).json(getusersinadmin);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  

  /// delete user  in admin 

//   exports.deleteusers=async(req,res)=>{
//     console.log("inside the  user delete function ");

//     const{userId}=req.params
    
//     try {



//         const deleteuser=await users.findByIdAndDelete(userId)
//         // const deleteuser=await users.findByIdAndDelete(userId)
//         res.status(200).json(deleteuser)



        
//     } catch (error) {

//         res.status(500).json(error)
        
        
//     }
//   }


/// get all userslength in admin page


exports.getalluserslengthinadmin=async(req,res)=>{
    console.log("inside the function of all get all users");

    try {
        
        const getusers=await users.find()
        res.status(200).json(getusers)
        
    } catch (err) {
        res.status(500).json(err)
        
    }
    
  }


  //// delete users by admin

  exports.deleteusersbyadmin=async(req,res)=>{
    console.log("inside the admin delete the user function");

    const {id}=req.params;

    try {

        const result=await users.findByIdAndDelete(id)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(406).json("cannot delete user")
        }
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
  }

  /// add feedback

  exports.addfeedback=async(req,res)=>{
    console.log("inside the add feedback  function");
     const userId=req.payload
    const {classId,comment} = req.body;

    try {

      const newfeedback=new feedback({
        userId,
        // trainerId,
        classId,
        // rating,
        comment,
      

      })
      await newfeedback.save()
      res.status(200).json(newfeedback)      
      
    } catch (error) {
      res.status(401).json(error)
           
    }
    

  }

  /// get all feedback

  exports.getallfeedback=async(req,res)=>{

    console.log("inside the get all feedback function");
    

    try {

      const getallfeedback=await feedback.find()
      // .populate('trainerId', 'trainername')
      .populate('userId', 'username email')
      .populate('classId', 'trainername classname email');
      if(getallfeedback){
        res.status(200).json(getallfeedback)
      }else{
        res.status(406).json("cannot get feedback")
      }


      
    } catch (error) {
      res.status(401).json(error)
      
    }

  }

  /// feedback status
  exports.updatefeedbackStatus = async (req, res) => {
  
      console.log("inside the updatefeedback status");
      
      const { id } = req.params;
      const { status } = req.body;
  
      try {
          const updatedfeedbackstatus = await feedback.findByIdAndUpdate(  id,{ status },{ new: true }
          );
  
          if (!updatedfeedbackstatus) {
              return res.status(404).json("feedback not found");
          }
  
          res.status(200).json(updatedfeedbackstatus);
      } catch (error) {
          res.status(500).json(error);
      }
  };


  /// display feedback in home page

  exports.getAccepetedfeedback = async (req, res) => {
      try {
          const acceptedfeedback = await feedback.find({ status: "accepted" })
          .populate('userId', 'username email')
          .populate('classId', 'trainername classname email');
          res.status(200).json(acceptedfeedback);
      } catch (error) {
          res.status(500).json(error);
      }
  };
  

  /// 
  // GET /api/feedback?userId=xxx&classId=yyy
// exports.getFeedbackByUserAndClass = async (req, res) => {
//   const { userId, classId } = req.body;

//   try {
//     const feedbackuser = await feedback.findOne({ userId, classId });
//     res.status(200).json(feedbackuser);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching feedback", error: err.message });
//   }
// };




/// edit user profile


exports.edituserprofile=async(req,res)=>{
  console.log("inside the function of edit user profile");

  const userId=req.payload   /// for token
  const{position}=req.body  /// get data to edit from collection
  // const profilephoto=req.file.filename
  const profilephoto = req.file ? req.file.filename : req.body.profilephoto

  console.log(position);
  
  console.log(profilephoto);
  




  try {
  
    const edituserprofile=await users.findByIdAndUpdate(userId,{position,profilephoto},{new:true})

    if(!edituserprofile){
      res.status(406).json("cannot edit user profile")
    }else{
      res.status(200).json(edituserprofile)
    }
    
  } catch (error) {

    res.status(401).json(error)
    
  }


  
}


/// display user profile photo in header

exports.displayphoto = async (req, res) => {
  console.log("Inside display user profile photo function");

  const userId = req.payload; // ID from JWT token

  try {
    const user = await users.findById(userId).select('profilephoto');

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};








  








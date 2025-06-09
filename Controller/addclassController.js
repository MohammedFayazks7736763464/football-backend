const classes=require('../Model/addclassSchema');
const selectedClass=require('../Model/selectclassSchema')
const users=require('../Model/userSchema')
const Enrolled=require('../Model/EnrolledSchema')
///// add classes


exports.addclasses=async(req,res)=>{
    console.log("inside the addclass function");
    const{classname,trainername,email,seats,price,description,duration}=req.body 
    const thumbnail = req.files?.thumbnail?.[0]?.filename;
    const video = req.files?.video?.[0]?.filename;

    // const thumbnail=req.file.filename 
    // const video=req.file.filename
    const userId=req.payload

    console.log(classname,trainername,email,seats,price,description,duration);
    console.log(thumbnail);
    console.log(userId);
    console.log(video);
    
    
    

    try {


        const existingclass=await classes.findOne({classname})
        if(existingclass){
            res.status(406).json("class already exist")

        }else{

            const newclass=new classes({

                 
             classname,thumbnail,video,trainername,email,seats,price,description,duration,userId,message:""


            })


            await newclass.save()  ///  save to database

            res.status(200).json(newclass)



        }




        
    } catch (error) {

        res.status(401).json(error)

        
    }

    

}

////admin approval

exports.updateClassStatus = async (req, res) => {

    console.log("inside the updateclass status");
    
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedClass = await classes.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json("Class not found");
        }

        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json(error);
    }
};


//// approved classes for users

exports.getApprovedClasses = async (req, res) => {
    try {
        const approvedClasses = await classes.find({ status: "approved" });
        res.status(200).json(approvedClasses);
    } catch (error) {
        res.status(500).json(error);
    }
};


/// get trainer classes

exports.getTrainerClasses = async (req, res) => {
    const userId = req.payload;
    try {
        const trainerClasses = await classes.find({ userId });
        res.status(200).json(trainerClasses);
    } catch (error) {
        res.status(500).json(error);
    }
};   


/// get the data to display in home component


exports.getHomeclasses=async(req,res)=>{

    try {

        const Homeclasses=await classes.find().limit(4)
        res.status(200).json(Homeclasses)
        
    } catch (error) {
        res.status(500).json(error)
        
    }



}


/// for view page get class by id
// Get class by ID
exports.getClassById = async (req, res) => {
    const { id } = req.params;

    try {
        const selectedClass = await classes.findById(id);

        if (!selectedClass) {
            return res.status(404).json("Class not found");
        }

        res.status(200).json(selectedClass);

    } catch (error) {
        res.status(500).json(error);
    }
};



//// selecting class

exports.selectclass=async(req,res)=>{


  
    console.log("inside the selecting class function");


    const userId=req.payload
    const{classId}=req.body
    

    try {

        const existingclass=await selectedClass.findOne({userId,classId})

        if(existingclass){
            res.status(406).json("class already exist")
        }else{
            const addnewclass=new selectedClass({
                userId,classId
            })

            await addnewclass.save()

            res.status(200).json(addnewclass)

        }
        
    } catch (error) {
        res.status(401).json(error)
    }

}



//  Get selected classes for a user
exports.getSelectedClasses = async (req, res) => {
    const userId = req.payload;
  
    try {
      const selections = await selectedClass.find({ userId });
      const classIds = selections.map(item => item.classId);
      const selectedClasses = await classes.find({ _id: { $in: classIds } });   ///  "Find all documents in the classes collection where _id is in the list classIds."
  
      res.status(200).json(selectedClasses);
    } catch (error) {
      res.status(401).json(error);
    }
  };



  //// editclassses by trainer


  exports.editclasses=async(req,res)=>{
    console.log("inside the edit function");
    

    const{classname,seats,price,description}=req.body  
    const thumbnail = req.file ? req.file.filename : req.body.thumbnail
    console.log(classname,seats,price,description);
    console.log(thumbnail);
    
  
    // const uploadImage=req.file?req.file.filename:thumbnail
    const userId=req.payload
    const{pid}=req.params   
  
    try {
  
  
      const editclass=await classes.findByIdAndUpdate({_id:pid},{
         classname,seats,price,description,userId,thumbnail:thumbnail},{new:true}                                                                     ///// enter the data that we want to update
      )
  
      await editclass.save()   ////  save to mdb
  
      res.status(200).json(editclass)
      
    } catch (error) {
  
      res.status(401).json(error)
  
      
    }
  
  
  }

  ///get success status in admin dashboard

  exports.getApprovedClassesinadimiin = async (req, res) => {
    try {
        const approvedClasses = await classes.find({ status: "approved" });
        res.status(200).json(approvedClasses);
    } catch (error) {
        res.status(500).json(error);
    }
};
  ///get pending status in admin dashboard

  exports.getpendingClassesinadimiin = async (req, res) => {
    try {
        const pendingClasses = await classes.find({ status: "pending" });
        res.status(200).json(pendingClasses);
    } catch (error) {
        res.status(500).json(error);
    }
};


//// get classes for edit in trainer panel

exports.getclassforedit=async(req,res)=>{
    console.log("inside the class edit function");

    const{ id }=req.params;
    try {

        const getclassforedit=await classes.findById(id)
        if(!getclassforedit){
            res.status(406).json("error")
        }
            res.status(200).json(getclassforedit)
          
    } catch (error) {
        res.status(401).json(error)
        
        
    }
    
}



// Trainer deletes their own class
exports.deleteclassbytrainer = async (req, res) => {
    console.log("Inside the trainer delete function");

    const { classId } = req.params;
    const userId = req.payload; // Assuming this comes from JWT token or session

    try {
        // Ensure the class belongs to the trainer
        const classToDelete = await classes.findOne({ _id: classId, userId });

        if (!classToDelete) {
            return res.status(404).json({ message: "Class not found or unauthorized access" });
        }

        // Proceed to delete the class
        await classes.findByIdAndDelete(classId);

        return res.status(200).json({ message: "Class deleted successfully" });

    } catch (error) {
        console.error("Error in deleting class: ", error);
        return res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
    }
};




/// delete the classes who selected by individual user 

exports.deleteSelectedClass = async (req, res) => {
    const userId = req.payload; // from token
    const { classId } = req.params; // ID of class to delete
  
    try {
      const result = await selectedClass.findOneAndDelete({ userId, classId });
      
      if (result) {
        res.status(200).json({ message: "Class removed from cart successfully." });
      } else {
        res.status(404).json({ message: "Class not found in cart." });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete class from cart.", error });
    }
  };
  




//// display amount  in payment

exports.displaypayment = async (req, res) => {

    console.log("inside payemt get function");
    
    const { id } = req.params;

    try {
        const selectedClass = await classes.findById(id);

        if (!selectedClass) {
            return res.status(404).json("payment  not found");
        }

        res.status(200).json(selectedClass);

    } catch (error) {
        res.status(500).json(error);
    }
};


///Enrolled payment add by user


exports.addpayment=async(req,res)=>{

    console.log("inside the add payment function");

    const userId=req.payload
    const{classId}=req.body
    
   try {

        const Enrolledclass=await Enrolled.findOne({userId,classId})

        if(Enrolledclass){
            res.status(406).json("already paid")
        }else{
            const addnewpayment=new Enrolled({
                userId,classId//feedbackId//trainerId // Assuming userId in `classes` is the trainer
            })             // trainerId:classData.userId, // Assuming userId in `classes` is the trainer

            await addnewpayment.save()

            res.status(200).json(addnewpayment)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }

}

/// get classes payed by users


exports.getpayedclasses = async (req, res) => {
    const userId = req.payload;
  
    try {
      const selections = await Enrolled.find({ userId });
      const classIds = selections.map(item => item.classId);
      const payedclasses = await classes.find({ _id: { $in: classIds } });   ///  "Find all documents in the classes collection where _id is in the list classIds."
  
      res.status(200).json(payedclasses);
    } catch (error) {
      res.status(401).json(error);
    }
  };



  ////trainer can see the all users who enrolled in there classes

 
  exports.getTrainerEnrollments = async (req, res) => {
    console.log("inside get all users in trainer");
  
    const trainerId = req.payload;
  
    try {
      // Get all classes owned by this trainer
      const trainerClasses = await classes.find({ userId: trainerId });
      const classIds = trainerClasses.map(c => c._id);
  
      // Find enrollments for those classes and populate user data
      const enrollments = await Enrolled.find({ classId: { $in: classIds } })
        .populate('userId', 'username email phonenumber')  // <-- only if userId is ObjectId with ref  // .populate() in Mongoose lets you automatically replace referenced IDs with the full documents they point to.using populat ewe get the usrname email behid the userId
        .populate('classId', 'classname price') // optional: get class name too
        // .populate('comment','comment')
  
      res.status(200).json(enrollments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch trainer enrollments", error: err.message });
    }
  };
  


  /// delete the class from cart when it payed

  exports.deletepayedclassfromcart= async (req, res) => {
    console.log("inside delete the class from cart when it payed by user");
    
    const userId = req.payload; // from token
    const { classId } = req.params; // ID of class to delete
  
    try {
      const result = await selectedClass.findOneAndDelete({ userId, classId });
      
      if (result) {
        res.status(200).json({ message: "Class removed from cart successfully." });
      } else {
        res.status(404).json({ message: "Class not found in cart." });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete class from cart.", error });
    }
  };


  ///  to find classes exist or not that user payed in classcomponent


  exports.existingclass=async(req,res)=>{
  
      console.log("inside the existing class inn function");
  
      const userId=req.payload
      const {classId}=req.body
      
   
      try {
          const existingclasses=await Enrolled.findOne({userId,classId})

          if(existingclasses){
           res.status(200).json(existingclasses)

           }
      
          else{
  
          res.status(406).json("not working")
  
          }
          
      } catch (err) {
          res.status(401).json(err)
          
      }
         
  
  }



  ///// display both trainer and classes in admin panel


  exports.gettrainerandclasses = async (req, res) => {

    console.log("inside the get both trainer and classes in admin page");
    
    try {
      const details = await Enrolled.find()
        .populate('classId', 'classname trainername')
        // .populate('trainerId','trainername email phonenumber')
        .populate('userId', 'username email'); // optional
  
      res.status(200).json(details);
    } catch (error) {
      res.status(401).json(error);
    }
  };


  /// get all pending classes in admin page  for manage classes


  exports.manageclass=async(req,res)=>{
    console.log("inside the function to display the pending classes in admin manageclasses ");
    try {

        const result=await classes.find({ status: "pending" })    
        res.status(200).json(result)
        
    } catch (error) {
        
        res.status(401).json(error)
        
        
    }
    

  }

  /// get user count to display it on home page

  exports.getusercount=async(req,res)=>{
    console.log("inside the function to get user count in homepage");

    try {
        // Group Enrolled documents by classId and count
        const enrollments = await Enrolled.aggregate([
          {
            $group: {
              _id: "$classId",
              count: { $sum: 1 }
            }
          }
        ]);
    
        // Create a map: { classId: count }
        const enrollmentMap = {};
        enrollments.forEach(e => {
          enrollmentMap[e._id.toString()] = e.count;
        });
    
        res.status(200).json(enrollmentMap);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch enrollment counts", error: err.message });
      }
    
  }


  // get payemnt details to display in user panel

  exports.getpaymentdetails=async(req,res)=>{
    console.log("inside the function of get all payment details ");
    const userId=req.payload

    try {

      const getpaymentdetails=await Enrolled.find({userId})
      .populate('classId', 'classname price trainername ')
      // .populate('userId','username')
      if(!getpaymentdetails){
        res.status(406).json("cannot get payment details")
      }else{
        res.status(200).json(getpaymentdetails)
      }
      
    } catch (error) {
      res.status(401).json(error)
      
    }
    

  }


  /// display to view  classes 


  exports.classdetails=async(req,res)=>{
    console.log(" inside the function of get class details");
    const {id}=req.params
    try {

      const classdetails=await classes.findById(id)
      // .populate('classId trainername ') // get all fields from classes collection
      // .populate('userId', 'username email'); // Optional: Get user info

      if(!classdetails){
        res.status(406).json("class not found")
      }else{
        res.status(200).json(classdetails)
      }
      
    } catch (error) {
      res.status(401).json(error)
      
    }
    

  }
  

  // for edit for add message by admin to user


  exports.adminmessage=async(req,res)=>{
     const {message}=req.body
    const{id}=req.params
    

    console.log("inside add message by admin to user  function");
    
    try {

       const adminmessages=await classes.findByIdAndUpdate(id,{message},{new:true}) 
       res.status(200).json(adminmessages)   
          
    } catch (error) {
      res.status(401).json(error)
      
    }
  }



  //// get message in trainer panel that added by admin

  exports.getmessage=async(req,res)=>{
    console.log("inside the function of get message in trainer panel");

    const userId=req.payload
    const{id}=req.params

    try {

      const getmessage=await classes.findOne({_id:id,userId}).select('message')   ///  to get individual data from collection

      if(!getmessage){
        res.status(406).json("cannot get message")
      }else{
        res.status(200).json(getmessage)
      }


      
    } catch (error) {
      res.status(401).json(error)
    }
    
    
  }


  ///  to display 
 

  


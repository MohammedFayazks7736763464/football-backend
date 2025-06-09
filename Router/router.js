const express=require('express')
const router=express.Router()
const usercontroller=require('../Controller/usersController')
const addclassController=require('../Controller/addclassController')
const jwtmiddleware=require('../Middleware/jwtmiddleware')
const multerConfig=require('../Middleware/multermiddleware')
const trainerController=require('../Controller/trainerController')


//// Register
router.post('/register',usercontroller.register)


//// login
router.post('/login',usercontroller.login)

// trainer register

router.post('/trainerregister',trainerController.trainerregister)

//trainer login

router.post('/trainerlogin',trainerController.trainerlogin)

/// admin
// router.patch('/isadmin',jwtmiddleware,usercontroller.makeAdmin)

/// addclass trainer

// router.post('/addclass',jwtmiddleware,multerConfig.single('thumbnail'),addclassController.addclasses)
router.post( '/addclass',jwtmiddleware,multerConfig.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'video', maxCount: 1 }]),addclassController.addclasses);


// Admin approves or rejects a class
router.patch('/class/status/:id',  addclassController.updateClassStatus);
// router.patch('/class/status/:id', jwtmiddleware, addclassController.updateClassStatus);


/// Get all approved classes (visible to users)
router.get('/classes/approved', addclassController.getApprovedClasses);

/// (Optional) Get all classes added by a specific trainer
// router.get('/trainer/classes', addclassController.getTrainerClasses);
router.get('/trainer/classes', jwtmiddleware, addclassController.getTrainerClasses);

//// get the data to display in home page
router.get('/gethomeclasses',addclassController.getHomeclasses);

/// for view page
router.get('/class/:id',addclassController.getClassById);

/// getall users

router.get('/getallusers',usercontroller.getallusers);

// get all trainers

router.get('/getalltrainers',trainerController.getalltrainers)

/// addclasses to cart by id

router.post('/selectclass',jwtmiddleware,addclassController.selectclass)

///get class for displaying cart

router.get('/getclass',jwtmiddleware,addclassController.getSelectedClasses)

/// edit class by trainer

router.put('/classes/edit/:pid',jwtmiddleware,multerConfig.single('thumbnail'),addclassController.editclasses)

///get all trainers number  in admin dashboard

router.get('/getalltrainerinadmin',trainerController.getalltrainersinadmin)


/// get success status in admin dashboard
router.get('/getapprovedclassesinadmin',addclassController.getApprovedClassesinadimiin)

///get pending status in admin dashboard
router.get('/getpendingclassesinadmin',addclassController.getpendingClassesinadimiin)

///get all users in admin manage
router.get('/getallusersinadmin',usercontroller.getallusersinadmin)

/// delete user from admin 
router.delete('/trainer/delete-class/:classId',jwtmiddleware,addclassController.deleteclassbytrainer)

/// delete classes selected by user

router.delete('/deleteclassesfromcart/:classId',jwtmiddleware,addclassController.deleteSelectedClass)
 
////display payment in payment 

router.get('/displaypayment/:id',addclassController.displaypayment)

//// get all userslength in admin page

router.get("/getalluserslengthinadmin",usercontroller.getallusersinadmin)

/// delete users by admin

router.delete('/deleteusers/:id',usercontroller.deleteusersbyadmin)

//// for payment for user selected class

router.post('/addpayment',jwtmiddleware,addclassController.addpayment)
 
 
//// get classes that payed by user

router.get('/getclassespayed',jwtmiddleware,addclassController.getpayedclasses)

/// trainer can see the users who enrolled in there classes
router.get('/displayenrolledclasses',jwtmiddleware,addclassController.getTrainerEnrollments)

/// delete the class from cart that user already payed

router.delete('/deletepayedclassfromcart/:classId',jwtmiddleware,addclassController.deletepayedclassfromcart)

/// in class component that when click select button if user already enroled 

router.post('/existingclass',jwtmiddleware,addclassController.existingclass)

// get both classes and trainer and display it on admin page

router.get('/getbothclassesandtrainerinadmin',addclassController.gettrainerandclasses)


////get class for edit in trainer panel

router.get('/getclassforedit/:id',addclassController.getclassforedit);

/// add feedback

router.post('/addfeedback',jwtmiddleware,usercontroller.addfeedback)
/// get feedback

router.get('/getfeedback',usercontroller.getallfeedback)

/// feedback accepeted or rejected by admin

// router.patch('/feedback/status/:id', jwtmiddleware, usercontroller.updatefeedbackStatus);
router.patch('/feedback/status/:id',  usercontroller.updatefeedbackStatus);

/// get accepted feedback and display it

router.get('/acceptedfeedback', usercontroller.getAccepetedfeedback);

// to display the pending classes in admin manageclasses
router.get('/displaypendingclasses',addclassController.manageclass)

/// get user count in home page
router.get('/displayusercount',addclassController.getusercount)

// get user paymentdetails in user panel

router.get('/getpaymentdetails',jwtmiddleware,addclassController.getpaymentdetails)

// get class details 

router.get('/getclassdetails/:id',addclassController.classdetails)

///addmessage byadmin to user in adminpanel

router.patch('/adminmessage/:id',addclassController.adminmessage)


// edit user profile

router.patch('/edituserprofile',jwtmiddleware,multerConfig.single('profilephoto'),usercontroller.edituserprofile)

/// display photo in header

router.get('/displayphoto',jwtmiddleware,usercontroller.displayphoto)

////get message that add by admin in trainer panel

router.get('/getmessage/:id',jwtmiddleware,addclassController.getmessage)


















module.exports=router
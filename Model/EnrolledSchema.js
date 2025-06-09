const mongoose = require('mongoose');

const Enrolledschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
    required: true,
  },
  // trainerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'trainer',
  //   required: true,
  // },
  // feedbackId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'feedback',
  //       required: true,
  //     },
  createdAt:{
    type:Date,
    default:Date.now
    }
});

const Enrolled=mongoose.model("Enrolled",Enrolledschema)
module.exports=Enrolled

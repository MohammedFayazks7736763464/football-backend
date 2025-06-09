const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  // trainerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'trainer',
  //   required: true,
  // },
  classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'classes',
      required: true,
    },
//   rating: {
//     type: Number,
//     min: 1,
//     max: 5,
//     required: true,
//   },
  comment: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
    },


});
const feedback=mongoose.model('feedback',feedbackSchema)
module.exports=feedback

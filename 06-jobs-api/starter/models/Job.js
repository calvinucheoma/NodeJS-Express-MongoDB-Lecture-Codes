const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId, //now we are tying our job model to the user one so everytime we create a job, we will assign it to one of the users
      ref: 'User', //tying the job to the user here
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true } //once we set it up, we get 'createdAt' and 'updatedAt' properties by default
);

module.exports = mongoose.model('Job', JobSchema);

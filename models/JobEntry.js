const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobEntrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'jobs'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  breakTimes: {
    type: Array,
    default: []
  },
  hoursWorked: {
    type: Number,
    default: null
  },
  pay: {
    type: Number,
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
})

module.exports = JobEntry = mongoose.model('jobEntry', JobEntrySchema);

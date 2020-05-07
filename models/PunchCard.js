const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PunchCardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'jobs',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    default: ""
  },
  breakTimes: {
    type: Array,
    default: []
  }
})

module.exports = PunchCard = mongoose.model('punchCard', PunchCardSchema)

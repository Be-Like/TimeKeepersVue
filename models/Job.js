const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  active: {
    type: Boolean,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  pay: {
    type: Number,
    required: true
  },
  payPeriod: {
    type: String,
  },
  payDate: {
    type: Date,
  },
  street: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipcode: {
    type: Number
  },
  country: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String
  },
  website: {
    type: String
  },
  federalIncomeTax: {
    type: Number
  },
  stateIncomeTax: {
    type: Number
  },
  socialSecurity: {
    type: Number
  },
  medicare: {
    type: Number
  },
  individualRetirement: {
    type: Number
  },
  otherWithholdings: {
    type: Number
  }
});

module.exports = Job = mongoose.model('job', JobSchema);

const mongoose = require('mongoose');
const { MONGO_URI } = require('./config')

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;

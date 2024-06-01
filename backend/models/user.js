const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  }
}, {
  timestamps: true // This will add createdAt and updatedAt timestamps
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
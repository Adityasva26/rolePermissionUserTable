const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'], // Add any other roles as needed
    // required: true,
  },
  permissions: 
    {
      read: Boolean,
      write: Boolean,
      update: Boolean,
      delete: Boolean,
    },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;

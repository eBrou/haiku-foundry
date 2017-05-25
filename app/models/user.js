const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  userId: String,
  userName: String,
  password: String,
});

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema);

module.exports = { User };

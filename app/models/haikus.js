const mongoose = require('mongoose');
const haikuSchema = mongoose.Schema({
  user: String,
  date: String,
  text: String,
});

// create the model for users and expose it to our app
const Haiku = mongoose.model('Haiku', haikuSchema);

module.exports = { Session };

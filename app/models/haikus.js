const mongoose = require('mongoose');
const haikuSchema = mongoose.Schema({
  userId: String,
  date: String,
  haikuText: String,
});

// create the model for users and expose it to our app
const Haiku = mongoose.model('Haiku', haikuSchema);

module.exports = { Haiku };

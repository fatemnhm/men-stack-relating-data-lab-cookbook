const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
  // YOU DO: Define properties of food schema
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

module.exports = mongoose.model('User', userSchema);
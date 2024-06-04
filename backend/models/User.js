const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true, },
  password: {type: String, required: true},
  role: {type: String, required: true,enum: ['patient', 'doctor']},
});

module.exports = mongoose.model('User', userSchema);

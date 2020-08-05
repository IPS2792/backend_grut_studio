// ########### Load modules ###########
const mongoose = require('mongoose')

// ########### Data model definition ###########
const usersSchema = new mongoose.Schema({
  userFirstName: {
    type: String,
    minlength: 3,
    require: true,
    trim: true
  },
  userLastName: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  balance: {
    type: Number,
    minlength: 1,
    require: true,
    trim: true,
    default: 0
  }
})

// ########### Data model export ###########
module.exports = mongoose.model('users', usersSchema)

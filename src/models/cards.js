// ########### Load modules ###########
const mongoose = require('mongoose')

// ########### Data model definition ###########
const cardsSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    require: true,
    trim: true
  },
  rarityId: {
    type: String,
    minlength: 1,
    require: true,
    trim: true
  },
  price: {
    type: Number,
    minlength: 1,
    require: true,
    trim: true
  },
  img: {
    type: String,
    minlength: 1,
    require: true,
    trim: true
  },
  userId: {
    type: String,
    require: true
  }
})

// ########### Data model export ###########
module.exports = mongoose.model('cards', cardsSchema)

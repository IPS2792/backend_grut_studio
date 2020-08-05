// ########### Load modules ###########
const mongoose = require('mongoose')

// ########### Data model definition ###########
const purchasesSchema = new mongoose.Schema({
  idCard: {
    type: String,
    minlength: 1,
    require: true,
    trim: true
  },
  cardPrice: {
    type: Number,
    minlength: 1,
    require: true,
    trim: true
  },
  idUserBuyer: {
    type: String,
    minlength: 1,
    require: true,
    trim: true
  },
  idUserSeller: {
    type: String,
    minlength: 1,
    require: true,
    trim: true
  }
})

// ########### Data model export ###########
module.exports = mongoose.model('purchases', purchasesSchema)

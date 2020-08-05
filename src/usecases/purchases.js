// ########### Load modules & data models ###########
const User = require('../models/users')
const card = require('../models/cards')
const Purchase = require('../models/purchases')
const createError = require('http-errors')

// ########### Functions definition ###########
// Update balances
async function updateUserBalance (buyData) {
  // Deconstruct data and search info from users and card
  const { idCard, idUserBuyer, idUserSeller } = buyData
  const { price: cardPrice } = await card.findById(idCard)
  const { balance: buyerBalance } = await User.findById(idUserBuyer)
  const { balance: sellerBalance } = await User.findById(idUserSeller)

  // Validate if the user has enough funds to buy
  if (buyerBalance < cardPrice) throw createError(403, 'Insufficient balance')

  // Calculate new balance after the purchase
  const buyerFinalBalance = parseInt(buyerBalance - cardPrice)
  const sellerFinalBalance = parseInt(sellerBalance + cardPrice)

  // Update new balances
  const updateBuyerBalance = await User.findByIdAndUpdate(idUserBuyer, { balance: buyerFinalBalance })
  const updateSellerBalance = await User.findByIdAndUpdate(idUserSeller, { balance: sellerFinalBalance })
  return { updateBuyerBalance, updateSellerBalance }
}

// Buy function
async function createBuyCardOrder (buyData) {
  const newPurchase = new Purchase(buyData)
  return newPurchase.save()
}

// ########### Functions export ###########
module.exports = {
  createBuyCardOrder,
  updateUserBalance
}

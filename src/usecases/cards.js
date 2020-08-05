// ########### Load modules & data models ###########
const Card = require('../models/cards')

// ########### Functions definition ###########
// Create card function
async function createCard (cardData) {
  const newCard = new Card(cardData)
  const error = newCard.validateSync()
  if (error) throw error
  return newCard.save()
}

// Get all cards function
async function getAllCards () {
  const allCards = await Card.find()
  return allCards
}

// Function to get all cards from a certain user
async function getAllCardsFromUser (id) {
  const allUserCards = await Card.find({ userId: id })
  return allUserCards
}

// Function to get all information of a card
async function getCardInfo (id) {
  const allCardInfo = await Card.findById(id)
  return allCardInfo
}

// ########### Functions export ###########
module.exports = {
  createCard,
  getAllCards,
  getAllCardsFromUser,
  getCardInfo
}

// ########### Load modules & usecases ###########
const express = require('express')
const router = express.Router()
const cors = require('cors')
const card = require('../usecases/cards')

// ########### Load middlewares ###########
const auth = require('../middlewares/auth')

// ########### CORS implementation ###########
router.use(cors())

// ########### Functions definition ###########
// Create a new card
router.post('/newcard', auth, async (request, response) => {
  try {
    const newCard = await card.createCard(request.body)
    response.json({
      success: true,
      message: 'Great! New card was created',
      data: {
        newCard: newCard
      }
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// Get all cards
router.get('/', auth, async (request, response) => {
  try {
    const allCards = await card.getAllCards()
    response.json({
      message: 'All Cards XP',
      data: {
        cards: allCards
      }
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// Get all cards from a user
router.get('/collection/:userid', auth, async (request, response) => {
  try {
    const { userid } = request.params
    const allUserCards = await card.getAllCardsFromUser(userid)
    response.json({
      success: true,
      data: {
        allUserCards: allUserCards
      }
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// Get all cards from a user
router.get('/information/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const allCardInfo = await card.getCardInfo(id)
    response.json({
      success: true,
      data: {
        allUserCards: allCardInfo
      }
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// ########### Functions export ###########
module.exports = router

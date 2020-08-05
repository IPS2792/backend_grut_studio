// ########### Load modules & usecases ###########
const express = require('express')
const router = express.Router()
const cors = require('cors')


// ########### Load middlewares ###########
const auth = require('../middlewares/auth')

// ########### CORS implementation ###########
router.use(cors())

// ########### Functions definition ###########
// Buy function
router.post('/:id/buy', auth, async (request, response) => {
  try {
    const buyCard = await purchases
    response.json({
      success: true,
      message: 'Great! Card purchased',
      data: {
        buyCard: buyCard
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

// Sell function
router.get('/:id/sell', auth, async (request, response) => {
  try {
    const sellCard = await purchases
    response.json({
      message: 'Great! Card sold',
      data: {
        sellCard: sellCard
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

// ########### Load modules & usecases ###########
const express = require('express')
const router = express.Router()
const cors = require('cors')
const User = require('../usecases/users')
const purchases = require('../usecases/purchases')

// ########### Load middlewares ###########
const auth = require('../middlewares/auth')

// ########### CORS implementation ###########
router.use(cors())

// ########### Functions definition ###########
// Signup function
router.post('/signup', async (request, response) => {
  try {
    const newUser = await User.userSignUp(request.body)
    response.json({
      success: true,
      message: 'Signup successful',
      data: {
        user: newUser
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// Function to get all cards of our property
router.get('/:id/collection', auth, async (request, response) => {
  try {
    const { id } = request.params
    const userCards = await User.getUserCollection(id)
    response.json({
      success: true,
      data: {
        userCards: userCards
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

// Function to get all purchases that have been done
router.get('/:id/purchases', auth, async (request, response) => {
  try {
    const { id } = request.params
    const userPurchases = await User.getUserPurchases(id)
    response.json({
      success: true,
      data: {
        userPurchases: userPurchases
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

// Function to get all sells that have been done
router.get('/:id/sells', auth, async (request, response) => {
  try {
    const { id } = request.params
    const userSells = await User.getUserSells(id)
    response.json({
      success: true,
      data: {
        userSells: userSells
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

// Buy function
router.post('/buy', auth, async (request, response) => {
  try {
    const buyCard = await purchases.createBuyCardOrder(request.body)
    const {updateBuyerBalance, updateSellerBalance} = await purchases.updateUserBalance(request.body)
    response.json({
      success: true,
      message: 'Great! Card purchased',
      data: {
        buyCard: buyCard,
        buyerId: updateBuyerBalance._id,
        sellerId: updateSellerBalance._id
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

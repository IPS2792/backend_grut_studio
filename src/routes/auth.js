// Load modules & usecases
const express = require('express')
const router = express.Router()
const cors = require('cors')
const User = require('../usecases/users')

// CORS implementation
router.use(cors())

// Functions definition
// Login function
router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body
    const token = await User.userLogin(email, password)

    response.json({
      success: true,
      message: 'logged in',
      data: {
        token
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

module.exports = router

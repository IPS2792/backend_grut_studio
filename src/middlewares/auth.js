// ########### Load modules ###########
const jwt = require('../lib/jwt')

// ########### Function definition ###########
function auth (request, response, next) {
  const { authorization: token } = request.headers
  console.log('Token: ', token)
  try {
    const decodedToken = jwt.verify(token)
    console.log('Valid token')
    console.log('Decoded token: ', decodedToken)
    next()
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'Unauthorized'
    })
  }
}

// ########### Functions export ###########
module.exports = auth

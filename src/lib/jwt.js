// ########### Load jwt module and define secret ###########
const jwt = require('jsonwebtoken')
const secret = '9ea8fa4cdd512e3f7b17eb70f685f976'

// ########### Functions definition ###########
// Sign function for token generation
function sign (payload = {}) {
  return jwt.sign(payload, secret)
}

// Verify function for token validation
function verify (token = '') {
  return jwt.verify(token, secret)
}

// ########### Functions export ###########
module.exports = {
  ...jwt,
  sign,
  verify
}

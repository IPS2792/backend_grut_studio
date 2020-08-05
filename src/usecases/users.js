// ########### Load modules & data models ###########
const User = require('../models/users')
const card = require('../models/cards')
const purchase = require('../models/purchases')
const createError = require('http-errors')

// ########### Load middlewares ###########
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt')

// ########### Functions definition ###########
// Signup function
async function userSignUp (userData) {
  const { userFirstName, userLastName, email, password } = userData
  // Validation of user input information
  if (!userFirstName) throw createError(400, 'Nombre: este campo es requerido')
  if (!userLastName) throw createError(400, 'Apellidos: este campo es requerido')

  // Validation of account input information
  if (!email) throw createError(400, 'Email: este campo es requerido')
  if (!password) throw createError(400, 'Contraseña: este campo es requerido')

  // Unique validation
  const userAlreadyExist = await User.findOne({ email })
  if (userAlreadyExist) throw createError(409, `El email [${email}] ya existe`)

  // Password validation
  if (password.length < 8) throw createError(409, 'Por favor, introduzca una contraseña de al menos 8 caracteres')

  // Password encryption
  const hash = await bcrypt.hash(password, 10)
  const newUser = new User({ ...userData, password: hash })
  const error = newUser.validateSync()
  if (error) throw error

  // Show action result
  return newUser.save()
}

// Login function
async function userLogin (email, password) {
  // Validate email & password
  const user = await User.findOne({ email })
  if (!user) throw createError(400, 'Invalid data')
  const passwordValid = await bcrypt.compare(password, user.password)
  if (!passwordValid) throw createError(400, 'Invalid data')

  // Return a token
  return jwt.sign({ id: user._id })
}

// Function to get all cards of our property
async function getUserCollection (id) {
  const allUserCards = await card.find({ userId: id })
  return allUserCards
}

// Function to get all purchases history
async function getUserPurchases (id) {
  const allUserPurchases = await purchase.find({ idUserBuyer: id })
  return allUserPurchases
}

// Function to get all sells history
async function getUserSells (id) {
  const allUserSells = await purchase.find({ idUserSeller: id })
  return allUserSells
}

// ########### Functions export ###########
module.exports = {
  userSignUp,
  userLogin,
  getUserCollection,
  getUserPurchases,
  getUserSells
}

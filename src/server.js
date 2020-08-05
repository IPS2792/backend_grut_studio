// ########### Load modules & routes ###########
const express = require('express')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const cardsRouter = require('./routes/cards')

// ########### Assign of express module to app ###########
const app = express()

// ########### Define app object uses ###########
app.use(express.json())
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/cards', cardsRouter)

// ########### Export app object ###########
module.exports = app

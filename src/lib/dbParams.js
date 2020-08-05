// ########### DB connection params ###########
const mongoose = require('mongoose')
const user = 'IPS2792'
const password = 'wYJAkD6i6e9xQqi'
const host = 'kodemia-7ma-gen-llxsb.mongodb.net'
const dbName = 'grutStudio'
const url = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`

// ########### Connect function definition ###########
function connect () {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

// ########### Function export ###########
module.exports = {
  connect
}

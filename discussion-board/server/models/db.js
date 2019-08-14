const mongoose = require('mongoose')
const dbUrl = `mongodb://localhost/aip`
const options = { useNewUrlParser: true }

mongoose.connect(dbUrl, options)

const db = mongoose.connection

db.on('connected', () => {
  console.log(`Mongoose connection to ${dbUrl}`)
})

db.on('error', (err) => {
  console.log(`Mongoose error: ${err}`)
})

db.on('disconnnected', () => {
  console.log(`Mongoose disconnnected...`)
})
const mongoose = require('mongoose')
const options = { useNewUrlParser: true, useFindAndModify: true }
mongoose.set('useCreateIndex', true);
const dbName = 'imgForum'
let client

mongoose
    .connect('mongodb://localhost:27017/api', options)

const db = mongoose.connection

db.on('connected', () => {
    console.log("mongoose connected...")
})

db.on('error', (err) => {
    console.log(`mongoose error: ${err}`)
})

db.on('disconneted', () => {
    console.log('mongoose disconnected')
})

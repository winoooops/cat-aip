const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
    url: String,
    author: String,
    // comments: Array
})

module.exports = mongoose.model('Image', imgSchema)
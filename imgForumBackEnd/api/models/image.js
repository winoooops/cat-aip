const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    author: String,
    tags: [String],
    commentOn: String,
    createdAt: Date
})

module.exports = mongoose.model('Image', imgSchema)
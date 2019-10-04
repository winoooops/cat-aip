const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    author: String,
    tags: [String],
})

// setting the recursive value 

imgSchema.add({
    comments: [imgSchema]
})

module.exports = mongoose.model('Image', imgSchema)
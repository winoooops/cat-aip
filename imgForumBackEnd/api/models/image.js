const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    emoji: String,
    author: String,
    tags: [String],
    isRoot: { type: Boolean, default: false },
    createdAt: Date,
})
// recursively add imgSchema
imgSchema.add({
    comments: [imgSchema]
})


module.exports = mongoose.model('Image', imgSchema)
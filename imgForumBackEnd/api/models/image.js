const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
    img: {
        data: Buffer, 
        contentType: String
    }, 
    timestamps: true // auto save and update
})

module.exports = mongoose.model('Image', imgSchema)
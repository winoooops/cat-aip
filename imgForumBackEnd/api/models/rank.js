const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rankSchema = new Schema({
    viewNum: Number, 
    username: String,
    imageId: String
})

const Rank = mongoose.model('Rank', rankSchema)
var arr=[{viewNum:55,username: "hsjbfsjfb", imageId: "lfbnksbs"},{viewNum:43,username: "releadksjfb", imageId: "lfbnksskdskbs"}]
Rank.insertMany(arr);


module.exports = Rank

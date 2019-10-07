const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type : String,
        unique: true,
        required: true,
        trim: true
    }, 
    email: {
        type : String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type : String,
        required: true
    },
    salt: String
})
  
userSchema.plugin(uniqueValidator);
  
const User = mongoose.model('User', userSchema)

module.exports = User;

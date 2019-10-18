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
  

// This plugin will pre-check if the user being created has unique username and email address.
// If not unique, it will return error to the user.regiser function. 
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema)

module.exports = User;

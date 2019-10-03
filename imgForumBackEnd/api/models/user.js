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
    }
})
  
userSchema.plugin(uniqueValidator);
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });
  
const User = mongoose.model('User', userSchema)

module.exports = User;

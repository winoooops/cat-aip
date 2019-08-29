const express = require('express')
const router = express.Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')
const saltRounds = 10 

// check connection status with mongodb server

/*****************************************
 provide login functionality
 1. store the salt 
 2. hash the password 
 3. store the password hash, instead of passowrd
 4. store the record on MongoDB
******************************************/

// post method
router.post('/register', (req,res) => {
    const { userId, email, pwd } = req.body
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) {
            console.log(err);
            return
        }
        bcrypt.hash(pwd, salt, (err, hash) => {
            if(err) {
                console.log(err);
                return
            }
            new User({
                userId: userId, 
                email: email, 
                salt: salt,
                hash: hash
            }).save()
            // send back some msg so the angular learn it need to redirect to login route
            res.send({
                status: "success"
            })    
        })
        
    }) 
})




/*****************************************
 *  user login & authentification 
******************************************/
// router.get('/login', (req,res) => {
//     req.
// })


module.exports = router
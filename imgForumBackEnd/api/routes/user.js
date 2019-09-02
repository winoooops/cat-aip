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
router.post('/register', (req, res) => {
    const { userId, email, pwd } = req.body
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log(err);
            return
        }
        bcrypt.hash(pwd, salt, (err, hash) => {
            if (err) {
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


router.post('/signin', (req, res) => {
    // 1. get the form data from user input (userId, password)
    // 2. check if we can find a matched userID
    // 2.1 if not found, notify user to register
    // 2.2 if found, do 3
    // 3. get the salt from database 
    // 4. hahs the inputed password using salt 
    // 5. compare the inputed hash with the hahs in the database
    // 5.1 if they are different, not allowed login 
    const { userId, password } = req.body
    User
        .find({ userId })
        .then(obj => {
            if (obj.length === 0) {
                // 2.1 if not found, notify user to register
                // send back a json respons saying the id doesn't exist
                res.json({
                    "message": "Id not found..."
                })
            }
            const salt = obj[0]['salt']//get the salt from database
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return err;
                // comepare the inputed hash with the hash store
                if (hash === obj[0]['hash']) {
                    res.json({
                        "message": "RightOn..."
                    })
                } else {
                    res.json({
                        "message": "wrong password"
                    })
                }

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
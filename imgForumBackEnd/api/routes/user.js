const express = require('express')
const router = express.Router()
const User = require('../models/user')
const salt = 10;
const bcrypt = require('bcrypt');

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
    // Get user information from the request
    var userData = {
        username: req.body.userId,
        email: req.body.email,
        password: req.body.pwd,    
    }
    User.create(userData, function (err, user) {
        if (err) {
            res.json({
                "message" : "Username and email must be unique!"
            });
        } else {
            res.json({
                "message" : req.body.userId
            });
        }
    });
    console.log("hhehhee")
})


router.post('/signin', (req, res) => {
    User.findOne({username : req.body.userId}, function(err, result) {
        if (err) {
            console.log(err);
        }
        bcrypt.compare(req.body.password, result.password, (err, correctness) => {
            if (correctness) {
                res.json({
                    "id" : req.body.userId
                })
            } else {
                res.json({
                    "id" : "wrong password!"
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
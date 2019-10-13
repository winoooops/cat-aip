const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// check connection status with mongodb server
/*****************************************
 provide login functionality
 1. store the salt 
 2. hash the password 
 3. store the password hash, instead of passowrd
 4. store the record on MongoDB
******************************************/
// post method
var sess;

router.post('/register', (req, res) => {
    // Get user information from the request
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.pwd, salt, function (err, hash) {
            if (err) {
                return console.error(err);
            }
            new User({
                username: req.body.userId,
                email: req.body.email,
                salt: salt,
                password: hash
            })
                .save()
                .then(r => {
                    res.json(r)
                })
        })
    })
})


router.post('/signin', (req, res) => {
    if (!req.body.password || !req.body.userId) {
        res.json({
            message: "username and password must be provided!"
        })
    }
    if (req.query.token) {
        res.json({
            "message": "Already signed in!"
        })
    }

    User
        .findOne({ username: req.body.userId })
        .then(doc => {
            // if (doc) {
            //     // 2.1 if not found, notify user to register
            //     // send back a json respons saying the id doesn't exist
            //     res.json({
            //         "message": "Id not found..."
            //     })
            // }
            console.log(doc)
            const salt = doc['salt']//get the salt from database
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return err;
                // comepare the inputed hash with the hash store
                if (hash === doc['password']) {
                    let token = jwt.sign({}, 'secret', {
                        expiresIn: '3h',
                        subject: req.body.userId
                    });
                    res.json({
                        token: token,
                        expiresIn: '3h',
                        username: doc['username']
                    })
                } else {
                    res.json({
                        "message": "Username/password not correct, please try again..."
                    })
                }

            })
        })
        .catch(() => {
            res.json({ message: "Username doesn't exist...Please register" })
        })

})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({
            "message": "reset!"
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
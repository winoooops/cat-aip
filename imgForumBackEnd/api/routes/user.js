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
})

  
router.post('/signin', (req, res) => {
    if (!req.body.password || !req.body.userId) {
        res.json({
            message : "username and password must be provided!"
        })
    }
    User.findOne({username : req.body.userId}, function(err, result) {
        if (err) {
            console.log(err);
        }
        bcrypt.compare(req.body.password, result.password, (err, correctness) => {
            if (err) {
                console.log(err);
            }
            // username and password match
            if (correctness) {
                // generate token
                let token = jwt.sign({username:req.body.userId},'secret', {expiresIn : '3h'});
                res.json({
                    token : token,
                    id : req.body.userId
                })
            } else {
                console.log("Loggin failure!");
                res.json({
                    id : "wrong password!"
                })
            }
        })
    }) 
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({
            "message" : "reset!"
        })
    })
})

// Below codes are modified based on https://github.com/AzharHusain/token-based-authentication
router.get('/username', verifyToken, function(req,res,next){
    return res.status(200).json(decodedToken.username);
  })
  
var decodedToken = '';

function verifyToken(req,res,next){
    let token = req.query.token;
    jwt.verify(token,'secret', function(err, tokendata){
      if(err){
        return res.status(400).json({message:' Unauthorized request'});
      }
      if(tokendata){
        decodedToken = tokendata;
        next();
      }
    })
  }
  



/*****************************************
 *  user login & authentification 
******************************************/
// router.get('/login', (req,res) => {
//     req.
// })


module.exports = router
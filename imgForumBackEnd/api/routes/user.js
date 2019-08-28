const express = require('express')
const router = express.Router()
const User = require('../models/user')
// check connection status with mongodb server

/*****************************************
 *  provide login functionality
******************************************/
// show the login page <---- handle by angualr already

router.get('/login', (req,res) => {
    res.json(
        { message: 'need a cup of tea'}
    )
})

// post method
router.post('/login', (req,res) => {
    
    console.log( req.body )
    const userId = req.body.userId
    const pwd = req.body.pwd

    User
        .collection
        .insertOne({ userId, pwd})
        .then( (data) => {
            res.json({"registed": true})
        })
})




/*****************************************
 *  user authentification 
******************************************/



module.exports = router
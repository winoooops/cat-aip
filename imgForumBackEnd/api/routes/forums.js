const express = require('express')
const router = express.Router() 

router.get('/', (req, res) => {
    res.send('getting all the forums')
})

router.get('/post', (req,res) => {
    res.send('the form for posting imgage should be here')
})

router.post('/post', (req,res) => {
    res.send("send img post here")
})


module.exports = router
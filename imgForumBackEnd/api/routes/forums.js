const express = require('express')
const router = express.Router() 

router.get('/', (req, res) => {
    res.send('getting all the forums')
})

router.post('/', (req,res) => {
    res.send("send img post here")
})


module.exports = router
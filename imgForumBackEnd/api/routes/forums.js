const express = require('express')
const router = express.Router() 
const Image = require('../models/image')
// router.get('/post', (req,res) => {
//     res.send('showing the uplaod form ')
// })

router.post('/post', (req,res) => {
   
    // allow user to upload the image's url 
    // automatically takes down user's id
    // created an empty array for comments 

    // save records to the database
    // redirect and show uploaded image
    const { url, author } = req.body
    new Image({ url, author})
            .save()
            .then( () => {
                res.json({
                    "message": "image uploaded..." 
                 })
            })
})

router.get('/', (req,res) => {
    // read the image data
    // send an array as response upon req
   Image
    .find({})
    .then( (result) => {
        res.json( result )
    })

})


module.exports = router
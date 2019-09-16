const express = require('express')
const router = express.Router() 
const Image = require('../models/image')
const multer = require('multer')


 // define a storage location and naming strategy <---- multer enabled 
 const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads')
    },
    filename: (req,file,cb) => {
        cb(null, file.filename + '-' + Date.now() )
    } 
})

const upload = multer({ storage: storage })




router.post('/post', upload.single('myPic'), (req,res) => {
    // allow user to upload the image's url -> users are now required to upload img from disk (updated 16/09/19)
    // automatically takes down user's id
    // created an empty array for comments 

    // save records to the database
    // redirect and show uploaded image

    // parts of the code below is inspired from `https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088`
    const file = req.file
    if( !file ) {
        return 
    }

    const img = fs.readFileSync( req.file.path )
    const encode_img = img.toString('base64') // encode the img to a base64 string 

    new Image({
        data: new Buffer(encode_img, 'base64'),
        contentType: req.file.mimetype, 
        author: req.body.author
    })
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
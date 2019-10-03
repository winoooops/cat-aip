const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Image = require('../models/image')
const multer = require('multer')



// define a storage location and naming strategy <---- multer enabled 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname + '../../../images'))
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })


router.post('/post', upload.single('image'), (req, res) => {
    // allow user to upload the image's url -> users are now required to upload img from disk (updated 16/09/19)
    // automatically takes down user's id
    // created an empty array for comments 

    // save records to the database
    // redirect and show uploaded image

    // the code below is inspired by `https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088`

    const file = req.file
    if (!file) {
        return
    }

    const author = req.body.author
    const tags = req.body.tags
    console.log(tags)
    const img = fs.readFileSync(req.file.path)
    // const encode_img = img.toString('base64') // encode the img to a base64 string 

    /**********************************************************************
     * tell if the encode_img is properly encoded as base64
    **********************************************************************/

    // const base64Rejex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
    // const  isBase64Valid = base64Rejex.test(encode_img); // base64Data is the base64 string
    // if(isBase64Valid) {
    //     console.log('valid...')
    // }

    // store the img use Image model 
    // only store thme as buffer with its contentType
    new Image({
        img: {
            data: new Buffer(img),
            contentType: req.file.mimetype,
        },
        author: author,
        tags: tags
    })
        .save()
        .then(() => {
            res.json({
                "message": "image uploaded..."
            })
        })
})







router.get('/', (req, res) => {
    // read the image data
    // send an array of images as response upon req
    Image
        .find({})
        .then((result) => {
            console.log(result)
            res.json(result)
        })

})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Image
        .find({ "_id": id })
        .then(result => {
            res.json(result)
        })
})


module.exports = router
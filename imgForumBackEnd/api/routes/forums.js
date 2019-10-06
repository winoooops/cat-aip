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

    // part of the code below is inspired by `https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088`

    const file = req.file
    if (!file) {
        return
    }

    const author = req.body.author
    const tags = req.body.tags
    const commentOn = req.body.commentOn
    const img = fs.readFileSync(req.file.path)


    // store the img use Image model 

    if (commentOn === "") {
        // if the image is the root of a topic, just save it the the database with comments to be 0 
        new Image({
            img: {
                data: new Buffer(img),
                contentType: req.file.mimetype,
            },
            author: author,
            tags: tags,
            commentOn: commentOn,
            createdAt: new Date(),
            counts: 0
        })
            .save()
            .then((r) => {
                res.json(r)
            })


    } else {
        // if the image is commenting others, 
        // search the target doc with the commnetOn's value
        // increment the comments by 1 
        // save the new image
        Image
            .updateOne({ "_id": commentOn }, { $inc: { counts: 1 } })
            .then(() => {
                new Image({
                    img: {
                        data: new Buffer(img),
                        contentType: req.file.mimetype,
                    },
                    author: author,
                    tags: tags,
                    commentOn: commentOn,
                    createdAt: new Date(),
                    counts: 0
                })
                    .save()
                    .then((r) => {
                        res.json(r)
                    })
            })
    }
})


router.get('/', (req, res) => {
    // read all the image data
    // send an array of images as response upon req
    Image
        .find({})
        .then((result) => {
            console.log(result)
            res.json(result)
        })

})

router.get('/comment/:id', (req, res) => {
    const id = req.params.id

    Image
        .find({ commentOn: id })
        .then(result => {
            console.log(result)
            res.json(result)
        })
})


router.get('/tags/:tag', (req, res) => {
    // read the image data based on the tags
    //
    const tag = req.params.tag

    if (tag == "all") {
        Image
            .find({})
            .then((result) => {
                console.log(result)
                res.json(result)
            })
    }
    else {
        Image
            .find({ tags: { $all: [tag] } })
            .then(result => {
                res.json(result)
            })
    }

})



router.get('/:id', (req, res) => {
    // find the image base on its id
    // also get all the images that are commentingOn this image
    const id = req.params.id
    Image
        .find({ "_id": id })
        .then(result => {
            res.json(result)
        })
})


module.exports = router
const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Image = require('../models/image')
const multer = require('multer')
const expressJwt = require('express-jwt')
// const Objec

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


//This middleware will throw an error if a correctly signed JWT is not present in the Authorization header. 
//The middleware will also throw an error if the JWT is correctly signed, but it has already expired.
const checkIfAuthenticated = expressJwt({
    secret: 'secret'
});

router.post('/post', upload.single('image'), checkIfAuthenticated, (req, res) => {
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

    console.log( req.body )
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
            isRoot: true,
            createdAt: new Date(),
            comments: []
        })
            .save()
            .then((r) => {
                res.json(r)
            })


    } else {
        // if the image is commenting others, 
        // search the target doc with the commnetOn's value
        // add the new Image inside
        Image
            .findOneAndUpdate(
                {_id: commentOn }, 
                { $push: 
                    {
                        comments: 
                        {
                            img: {
                                data: new Buffer(img),
                                contentType: req.file.mimetype,
                            },
                            author: author,
                            tags: tags,
                            isRoot: false,
                            createdAt: new Date(),
                            comment: []
                        }
                    }
                }
                    
            )
            .then( (r) => {
                console.log('succeed')
                res.status(200).json( r )
            })
            .catch( err => {
                console.log("poop")
                res.status(400).json(err)
            })
    }
})


router.put('/:id', upload.single('image'), checkIfAuthenticated, (req, res) => {
    const file = req.file
    if (!file) {
        return
    }

    const tags = req.body.tags
    const img = fs.readFileSync(req.file.path)


    Image
        .updateOne({ _id: req.params.id }, {
            img: {
                data: new Buffer(img),
                contentType: req.file.mimetype,
            },
            tags: tags,
        })
        .then(r => {
            res.json(r)
        })
})



router.post('/emoji', checkIfAuthenticated, (req, res) => {
    // issue found: because express can not parse form data, if I do it in the old way, the req.body would be empty 
    //-> resolved by add httpHeaders to be app/json
    Image
        .findOneAndUpdate(
            { "_id": req.body.commentOn }, 
            { 
                $push: {
                    comments: {
                        emoji: req.body.code, 
                        author: req.body.author, 
                    }
                }
            }    
        )
        .then( r => {
            // get a new copy of the comment 
            res.status(200).json( r )
        })
        .catch( err => {
            res.status(400).json(err)
        })
})

router.put('/emoji-change', checkIfAuthenticated, (req, res) => {
    //
    Image
        .updateOne({ _id: req.body.id }, { emoji: req.body.code })
        .then(r => {
            res.json(r)
        })
})

// router.get('/', (req, res) => {
//     // read all the image data
//     // send an array of images as response upon req
//     Image
//         .find({ isRoot: true })
//         .then((result) => {
//             console.log( result.length )
//             res.json(result)
//         })

// })

router.get('/comment/:id', (req, res) => {
    const id = req.params.id
    // noted that, the results includes iamge and emoji comments 
    Image
        .find({ commentOn: id })
        .then(result => {
            res.json(result)
        })
})


router.get('/hot-threads', (req, res) => {
    // find all the root images in the database ``````````````
    Image
        .aggregate([
            { $match: { isRoot: { $eq: true } } },
            { $sort: { counts: -1 } },
            { $limit: 5 }
        ])
        .then(r => {
            res.json(r)
        })
})


router.get('/tags/:tag', (req, res) => {
    // read the image data based on the tags
    //
    const tag = req.params.tag
    if (tag == "all") {
        Image
            .find({ isRoot: { $eq: true } })
            .then((result) => {
                res.json(result)
            })
    }
    else {
        Image
            .find({ isRoot: { $eq: true }, tags: { $all: [tag] } })
            .then(result => {
                res.json(result)
            })
    }

})


// get the doc's data by _id 
// if the id is passed by threads compoenent, this will only search for image docs
// if the id is passed by comments component, this will search all the docs type
router.get('/:id', (req, res) => {
    const id = req.params.id
    Image
        .findOne({ "_id": id })
        .then(result => {
            res.json(result)
        })
})



router.delete('/:id', checkIfAuthenticated, (req, res) => {
    Image
        .deleteOne({ _id: req.params.id })
        .then((r) => {
            res.json(r)
        })
})

module.exports = router
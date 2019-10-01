var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
const Image = require('../models/image');
var router = express.Router();
var mime = require('mime');
const multer = require('multer')
var path = require('path')


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname + '../../../images') )
    },
    filename: (req,file,cb) => {
        cb(null, file.filename + '-' + Date.now() )
    } 
})

const upload = multer({ storage: storage })
router.post('/post', upload.single('image'), (req,res) => {
   
    if(!req.file){
        return
    }
    var newImg = fs.readFileSync(req.file.path);
    var encImg = newImg.toString('base64');
    var image = new Image({
        img: {
        data: new Buffer(encImg, 'base64'),
        contentType: req.file.mimetype, 
        },
        userId:1314,
    }).save(function (){
    
    console.log('saved img to mongo');

    })
    
    
})

router.get('/', (req,res) => {
    // read the image data
    // send an array as response upon req
   Image.find().then( (result) => {
        res.json( result )
        console.log(result)
    })

})  

router.get('/:id',(req, res)=>{
    const id = req.params.id
    Image.find({"_id":id}).then(result=>{
        res.json(result)
        console.log(result)
    })
})
module.exports = router
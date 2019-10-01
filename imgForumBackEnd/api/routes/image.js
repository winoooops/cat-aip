var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
const Image = require('../models/image');
var router = express.Router();
var mime = require('mime');
const multer = require('multer')
var path = require('path')

// require the image url from users
//Image.remove();
//var imagePath = "C:/Users/21043/Pictures/My Image Garden/testimage.jpg";
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

    
    //router.get('/', function(req, res, next){
        // Image.find({userId:5566}, function(err, doc){
        //    // if(err) return next(err);
        //    // res.contentType(doc.img.contentType);
        //     //res.send(doc.img.data)
        //     console.log(doc.img.data);
        //     console.log(doc.img.contentType)            
        // });
    //});

   
    })
    router.get('/', (req,res) => {
        // read the image data
        // send an array as response upon req
       Image.find(image).then( (result) => {
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
    // Image.find(image).exec(function(err, docs){
    //     //console.log(docs);
    // })
    
    
})


module.exports = router
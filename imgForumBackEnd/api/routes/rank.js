const mongoose = require('mongoose')
var path = require('path')
var express = require('express')
var router = express.Router();
const Rank = require('../models/rank')
const Image = require('../models/image')

//testing
// new Rank({
//     viewNum: 60,
//     username:"ksdbs",
//     imageId:"5242121",
// }).save();
Rank.find().where('viewNum').gt(10).limit(10).sort({viewNum: -1}).exec(function(err,docs){
    //console.log(docs);
});
router.get('/', (req, res)=>{
    Image.find().then((result)=>{
        res.json(result)
        console.log(result[0].img.data)
    })
})

console.log("be happy");
module.exports = router

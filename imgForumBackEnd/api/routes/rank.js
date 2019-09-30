const mongoose = require('mongoose')

const Rank = require('../models/rank')

//testing
// new Rank({
//     viewNum: 60,
//     username:"ksdbs",
//     imageId:"5242121",
// }).save();
Rank.find().where('viewNum').gt(10).limit(10).sort({viewNum: -1}).exec(function(err,docs){
    //console.log(docs);
});

console.log("be happy");

const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require("multer")

// set up multer diskStorage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    // the image will be saved as img-upload-<date>.extension 
  }
})
const upload = multer({ storage }).single('img-upload')


router.get('/', (req, res) => {
  res.render('forums', { title: "forums" })
})

router.get('/upload', (req, res) => {
  res.render('upload', { title: "upload" })
})

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) return
    console.log(req.file)
    res.send('see console for more info')
  })
})


module.exports = router
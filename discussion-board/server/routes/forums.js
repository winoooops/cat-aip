const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('forums', { title: "forums" })
})

router.get('/upload', (req, res) => {
  res.render('upload', { title: "upload" })
})


module.exports = router
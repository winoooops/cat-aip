const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000

const homeRoute = require('./routes/home')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/', homeRoute)

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})
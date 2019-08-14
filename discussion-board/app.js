const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const app = express()

const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})
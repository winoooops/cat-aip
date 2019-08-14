const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000

const forumsRoute = require('./server/routes/forums')

// configurative middlewars
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))


// to use handlebars as template
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', forumsRoute)

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})
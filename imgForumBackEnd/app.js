const express = require('express')
const bodyParser = require('body-parser')
const forumRoute = require('./api/routes/forums')


const app = express() 
const PORT = 3000 

app.use( express.static('public'))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: false }))


app.use('/', forumRoute )

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

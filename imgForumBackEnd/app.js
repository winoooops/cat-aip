const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const forumRoute = require('./api/routes/forums')
const userRoute = require('./api/routes/user')
const db = require('./config/db')


const app = express() 
const PORT = 3000 




app.use( express.static('public'))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: false }))
app.use( cors() )

app.use('/forums', forumRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

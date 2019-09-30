const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const forumRoute = require('./api/routes/forums')
const userRoute = require('./api/routes/user')
const rankRoute = require('./api/routes/rank')
const db = require('./config/db')
const imageRoute = require('./api/routes/image')

const app = express() 
const PORT = 3000 




app.use( express.static('public'))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }))
app.use( cors() )
//app.use('/forums',forumRoute)
app.use('/forums', imageRoute)
app.use('/user', userRoute)
//app.use('/rank', rankRoute)
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

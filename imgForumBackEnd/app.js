const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const forumRoute = require('./api/routes/forums')
const userRoute = require('./api/routes/user')
const db = require('./config/db')

const app = express() 
const PORT = 3000 

app.use( express.static('public'))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }))
app.use( cors() )
app.use(cookieParser());

app.use('/forums', forumRoute)
app.use('/user', userRoute)

// This code is written by Evan Gow,
// Reference : https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d 
app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      return uuid()
    },
    store: new FileStore(),
    secret: 'cat-aip',
    resave: false,
    saveUninitialized: true
  }))
  
app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send("Hit home page\n")  
})

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

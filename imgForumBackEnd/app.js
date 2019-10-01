const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const session = require('express-session');

const forumRoute = require('./api/routes/forums')
const userRoute = require('./api/routes/user')
const db = require('./config/db')

const app = express() 
const PORT = 3000 

var corsOptions = {
    origin : 'http://localhost:4200',
    credentials : true
   }
app.use( cors(corsOptions) )
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
});

app.use( express.static('public'))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }))

app.use('/forums', forumRoute)
app.use('/user', userRoute)

app.get('/', (req, res) => {
    if (!req.session.count) {
        req.session.count = 1;
    }
    req.session.count++;
    res.json({
        count : req.session.count
    })
})
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

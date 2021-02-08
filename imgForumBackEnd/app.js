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
app.use( cors() )

app.use('/forums', forumRoute)
app.use('/user', userRoute)

const fileName = './images/undefined-1570156856411';

app.get('/', (req, res) => {
    check(req.file.path).then((result) => {
        if (result[0].textAnnotations.length != 0) {
            res.json({
                "message" : "no"
            })
        }
    })
    .catch((error) => {
        console.log(error);
    })
})

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

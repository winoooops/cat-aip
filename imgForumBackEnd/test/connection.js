const mongoose = require('mongoose')
const options = { useNewUrlParser: true}

// use the before method to make sure the database is conencted before the tests starts
// before() <-------from Mocha
// done() because this is asynchronous 

before( (done) => {
    mongoose.connect('mongodb://localhost:27017/api', options)

    //if the connect is valid
    mongoose.connection.once('open', () => {
        console.log('Connection to API Database has been made')
        done()
    }).on('error', (err) => {
        console.log(`Connection error: ${err}`)
    })

})


// drop all the records before each and every test starts
// usse done() again for asynchronos 
beforeEach( done => {
    mongoose.connection.collections.users.drop( () => done() )
})
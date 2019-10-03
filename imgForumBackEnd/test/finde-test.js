const mocha = require('mocha')
const assert = require('assert')
const User = require('../api/models/user.js')


// tells that this test is to test the finding functionality
describe('finding test', () => {
    let user 
    // create and save a dummy data every time
    beforeEach( (done) => {
        user = new User({
            userId: 'joe',
            email: 'joe@uts.com',
            salt: '', //salt and hash is for encryption, ignore them for now
            hash: ''
        })

        user
            .save()
            .then( () => done() )
    })

    // offcially starts the testing
    it('Find document by userId from the database', (done) => {
        User
            .findOne({ userId: 'joe'})
            .then( result => {
                assert( result.userId === 'joe') // pass when it is true
                done()
            })
    }) 

    it('find document by email from the database', (done) => {
        User
            .findOne({ email: 'joe@uts.com'})
            .then( result => {
                assert( result.email === 'joe@uts.com')
                done()
            })
    })
})



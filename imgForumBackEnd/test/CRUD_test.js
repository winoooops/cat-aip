const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../api/models/user.js')
mongoose.Promise = global.Promise;

// establish database connection
mongoose.connect('mongodb://localhost:27017/api', { useNewUrlParser: true }); 
mongoose.connection
    .once('open', () => console.log('Database connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
mongoose.set('useFindAndModify', false);

// drop all data in the database before all tests
before((done) => {
    mongoose.connection.collection('users').drop(() => {
        done(); 
    }); 
});

describe('Test CRUD of the database', () => {
    // test creating a user and save it in the db
    it('Test creating user', (done) => {
        const user = new User({ 
            userId: 'haochao',
            email: 'haochao@gmail.com' });
        user.save() 
            .then(() => {
                assert(!user.isNew); 
                done();
            });
    });

    // test finding a user with id equals to the one just added
    it('Test finding user with the name of haochao', (done) => {
        User.findOne({ userId: 'haochao' })
            .then( user => {
                assert(user.userId === 'haochao'); 
                done();
            });
    });

    // test updating the user's email to a new address
    it('Test update haochao\'s name', (done) => {
        let newEmailAddress = 'zhuhaochao@gmail.com'
        User.findOneAndUpdate({ userId: 'haochao' }, {$set:{email:newEmailAddress}}, {new:true})
                .then(() => User.findOne({ userId: 'haochao' }))
                .then(user => { assert(user.email === newEmailAddress);
                    done();
                    });
    });
    
    // test deleting this user from the database 
    it('Test deleting a user with the name of haochao', (done) => {
        User.findOneAndRemove({ userId: 'haochao' })
                .then(() => User.findOne({ userId: 'haochao' }))
                .then((user) => {
                    assert(user === null);
                done();
                });
    });

    // done testing, close database
    after(function(done){
          mongoose.connection.close(done);
    });
});


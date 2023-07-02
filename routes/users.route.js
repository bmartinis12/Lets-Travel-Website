let User = require('../models/user.model').User;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

// Check if user is in database

router.post('/login', async (req, res) => {
    let email = req.body.email;
    let password =  req.body.password;

    let users = await User.find().where({email: email});
    if(users.length > 0){
        let compareResult = await bcrypt.compare(password, users[0].password)
        if(compareResult){
            let token = auth.generateToken(users[0]);
            res.cookie('auth_token', token);
            res.send({
                redirectURL: '/admin',
                message: 'Success'
            });
        } else {
            res.send({ message: 'Rejected'});
        }
    } else {
        res.send({message: 'Rejected'});
    }
});

// Put registered user in database 

router.post('/register', async (req, res) => {
    let email = req.body.email;
    let password =  req.body.password;

    let users = await User.find().where({email: email});
    if(users.length === 0){
        let encryptedPass = await bcrypt.hash(password, 12)
        let newUser = new User({
            email: email,
            password: encryptedPass
        });
        await newUser.save();
        res.send({ message: 'Accepted!'});
    } else {
        res.send({ message: 'Rejected'});
    }
});

module.exports = router;
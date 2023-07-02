let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// User schema 

let userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

let User = mongoose.model('User', userSchema, 'users');

module.exports = { User };
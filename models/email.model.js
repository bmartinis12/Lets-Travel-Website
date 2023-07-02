let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Email schema 

let emailSchema = new Schema({
    id: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true },
    date: Date
});

let Email = mongoose.model('Email', emailSchema, 'emails');

module.exports = { Email };
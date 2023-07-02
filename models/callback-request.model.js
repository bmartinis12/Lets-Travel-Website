let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Callback request schema 

let callbackRequestSchema = new Schema({
    id: String, 
    phoneNumber: { type: String, required: true },
    date: Date
});

let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema, 'callback-requests');

module.exports = { CallbackRequest };
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Post Schema 

let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String
});

let Post = mongoose.model('Post', postSchema, 'posts');


module.exports = { Post };
let uniqid = require('uniqid');
let Post = require('../models/post.model').Post;
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

// Get all post data from database 

router.get('/', async (req, res) => {
    let posts = await Post.find();
    res.send(posts)
});

// Get data of post with matching id from database

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    res.send(post)
});

// Send post data to database

router.post('/', authMiddleware, async (req, res) => {
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageURL){
        imgPath = reqBody.imageURL;
    } else {
        imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);
    }
    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    });
    await newPost.save();
    res.send('Created');
});

// Delete post data from database

router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.deleteOne({id: id})
    res.send('Deleted')
});

// Update post data in database

router.put('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    res.send('Updated');
});


module.exports = router;
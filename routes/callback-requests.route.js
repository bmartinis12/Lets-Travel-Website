let uniqid = require('uniqid');
let CallbackRequest = require('../models/callback-request.model').CallbackRequest;
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

// Callback request get info from database

router.get('/', authMiddleware, async (req, res) => {
    res.send(await CallbackRequest.find());
});

// Callback requst send info to database

router.post('/', async (req, res) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    });
    await newRequest.save();
    res.send("Sent");
});

// Callback request delete info from database

router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await CallbackRequest.deleteOne({id: id});
    res.send("Deleted");
});

module.exports = router;
let uniqid = require('uniqid');
let Email = require('../models/email.model').Email;
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

// Email get info from database

router.get('/', authMiddleware, async (req, res) => {
    res.send(await Email.find());
});

// Email send info to database

router.post('/', async (req, res) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        name: reqBody.name,
        email: reqBody.email,
        text: reqBody.text,
        date: new Date()
    });
    await newEmail.save();
    res.send("Sent");
});

// Email delete info from database

router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Email.deleteOne({id: id});
    res.send("Deleted");
});

module.exports = router;
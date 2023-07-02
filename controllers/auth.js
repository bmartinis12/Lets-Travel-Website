let jwt = require('jsonwebtoken');

let secret = 'HDLSDHSJSKJDHSK'

function generateToken(user) {
    let payload = {
        email: user.email,
        password: user.password
    }
    return jwt.sign(payload, secret);
}

function checkToken(token) {
    try {
        let result = jwt.verify(token, secret);
        return result;
    } catch(error) {
        return null;
    }
}

module.exports = { generateToken, checkToken };
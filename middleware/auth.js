let auth = require('../controllers/auth');

// Check if user is authorized to access route 

function checkAuth(req, res, next) {
    let token = req.cookies['auth_token'];
    if(token !== null && auth.checkToken(token)){
        next();
    } else {
        res.status(400);
        res.send('Not authorized')
    }
}

module.exports = checkAuth;
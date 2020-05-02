const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const authToken = req.header('x-auth-token')
    if (!authToken) return res.status(401).send('Access denied. No token provided.');

    try{
        const decoded = jwt.verify(authToken, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid token.');
    }
}
const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
        console.log("No token provided");
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }
    try {
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log("Token expired");
        res.status(403).json({message: "Token expired"});
    }
}

module.exports = verifyToken;
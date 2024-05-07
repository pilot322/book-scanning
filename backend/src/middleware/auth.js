const jwt = require('jsonwebtoken');
const User = require('../api/models/User');
/**
 * 

 */
module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log("No token provided");
        return res.status(401).send({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            console.log('FUCK')
            return res.status(403).send({ error: 'Invalid token' });
        }
        req.username = decoded.username;
        req.roles = decoded.roles;
        const user = await User.findByUsername(decoded.username);
        req.userId = user._id;
        req.user = user;
        console.log(req.username, req.roles, req.userId);
        next();
    });
};

// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../api/models/User');
const ActionLog = require('../api/models/ActionLog');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here'; // Remember to define this in your environment

exports.generateToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
};

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Failed to authenticate token' });
        }
        req.user = decoded;  // Assume your token decoding sets up req.user
        next();
    });
};

// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../api/models/User');
const ActionLog = require('../api/models/ActionLog');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here'; // Remember to define this in your environment

exports.generateToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
};

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

exports.logout = async (req, res) => {
    // Log out logic: Log this action to ActionLog
    await ActionLog.createAction({
        user: req.user.userId,
        actionType: 'LOGOUT',
        onModel: 'User',
        description: 'User logged out',
        target: req.user.userId
    });
    res.send({ message: 'Logout successful. Discard the token client-side.' });
};

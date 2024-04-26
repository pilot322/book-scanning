// authController.js
const jwtMiddleware = require('../../middleware/auth');
const ActionLog = require('../models/ActionLog');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            console.log(`Password mismatch for user ${username}`);
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const token = jwtMiddleware.generateToken(user);
        await ActionLog.createAction({
            user: user._id,
            actionType: 'LOGIN',
            onModel: 'User',
            description: 'User logged in',
            target: user._id
        });
        res.send({ message: 'Login successful', token: token, user: { id: user._id, username: user.username } });
    } catch (error) {
        console.error(`Login error for user ${username}: ${error.message}`);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

exports.logout = async (req, res) => {
    console.log('placeholder')
    res.status(404).send({ message: 'Not implemented!' })
}
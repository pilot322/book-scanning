// authController.js
const jwtUtils = require('../../utils/jwtUtils');
const ActionLog = require('../models/ActionLog');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findByUsername(username);
        const isMatch = await user?.checkPassword(password);
        if (!isMatch || !user) {
            // console.log(`Password mismatch for user ${username}`);
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        const { accessToken, refreshToken } = jwtUtils.generateTokens(user);
        user.refreshToken = refreshToken;
        user.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000, sameSite: "strict" });

        res.json({ accessToken, roles: user.roles, username });
    } catch (error) {
        console.error(`Login error for user ${username}: ${error.message}`);
        console.error(error);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

exports.logout = async (req, res) => {
    // on client, also delete the access token
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;

    // is refreshtoken in db?
    const user = await User.findOne({ refreshToken });

    res.clearCookie('jwt', { httpOnly: true, secure: process.env.PRODUCTION ? true : false, sameSite: 'None' });

    if (!user) {
        return res.sendStatus(204);
    }

    user.refreshToken = null;
    user.save();

    res.sendStatus(204);

}; 

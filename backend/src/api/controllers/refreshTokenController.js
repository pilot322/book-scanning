// authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.handleRefreshToken = async (req, res) => {
    console.log('oh', req.cookies)

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }

    console.log(cookies.jwt)

    const refreshToken = cookies.jwt;

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            // console.log(`Password mismatch for user ${username}`);
            return res.sendStatus(403);
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || user.username !== decoded.username) {
                    return res.sendStatus(403);
                }
                const accessToken = jwt.sign(
                    {
                        username: user.username,
                        roles: user.roles,
                    }
                    , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' }
                );

                return res.send({ accessToken });
            });

    } catch (error) {
        console.error(`Refresh error for user ${username}: ${error.message}`);
        console.error(error);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};


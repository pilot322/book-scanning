const jwt = require('jsonwebtoken');

exports.generateTokens = (user) => {
    return {
        accessToken: jwt.sign({ username: user.username, roles: user.roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' }),
        refreshToken: jwt.sign({ username: user.username, roles: user.roles }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '16h' })
    }
};
const jwt = require('jsonwebtoken');

exports.generateTokens = (user) => {
    return {
        accessToken: jwt.sign({ roles: user.roles, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' }),
        refreshToken: jwt.sign({ roles: user.roles, username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '16h' })
    }
}

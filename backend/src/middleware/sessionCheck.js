// middleware/sessionCheck.js
const Session = require('../api/models/Session');
const User = require('../api/models/User');

async function enforceSingleSession(req, res, next) {
    try {
        const user = await User.findById(req.user.userId);

        if (user.currentSession) {
            return res.status(403).send({
                error: 'Active session in progress. Complete the session before performing other actions.'
            });
        }

        next();
    } catch (error) {
        console.error('Failed to check session status:', error);
        res.status(500).send({
            error: 'Internal Server Error'
        });
    }
}

module.exports = enforceSingleSession;

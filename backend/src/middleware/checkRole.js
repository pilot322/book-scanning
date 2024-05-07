/**
 * Middleware to check if the user has any of the allowed roles.
 * @param {string[]} allowedRole - A role that is permitted to use this route
 */
const checkRole = (allowedRole = 'admin') => {
    return (req, res, next) => {
        // Check if the user object and role exist on the request
        if (!req.username || !req.roles) {
            console.log('No user or roles')
            return res.status(401).json({ error: 'Unauthorized LOL' });
        }

        //console.log('User:', req.user);
        // Check if the user's role is in the list of allowed roles
        if (req.roles.includes(allowedRole)) {
            next(); // User has an appropriate role, proceed to the next middleware
        } else {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
    };
};

module.exports = checkRole
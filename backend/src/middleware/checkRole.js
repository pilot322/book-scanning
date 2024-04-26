/**
 * Middleware to check if the user has any of the allowed roles.
 * @param {string[]} allowedRoles - An array of roles which are permitted to access the route.
 */
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Check if the user object and role exist on the request
        if (!req.user || !req.user.role) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        //console.log('User:', req.user);
        // Check if the user's role is in the list of allowed roles
        if (allowedRoles.includes(req.user.role)) {
            next(); // User has an appropriate role, proceed to the next middleware
        } else {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
    };
};

module.exports = checkRole
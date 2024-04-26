const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/api/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ActionLog = require('../../src/api/models/ActionLog');

describe('Authentication API', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await new User({
            username: 'validUser',
            passwordHash: 'validPass',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            role: 'scanner',
            department: 1
        }).save();
    });

    it('should login successfully with correct credentials and return a JWT token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'validUser', password: 'validPass' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Login successful');
        const token = res.body.token;
        expect(token).toBeDefined(); // Check if JWT token is returned
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        expect(decoded.userId).toBeDefined();
    });

    it('should log the login action successfully when login is valid', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'validUser', password: 'validPass' });
        const token = res.body.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const logEntry = await ActionLog.findOne({ user: decoded.userId, actionType: 'LOGIN' });
        expect(logEntry).toBeDefined();
        expect(logEntry.description).toBe('User logged in');
    });

    it('should fail login with incorrect credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'validUser', password: 'invalidPass' });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe('Invalid username or password');
        expect(res.body.token).toBeUndefined(); // JWT should not be signed
    });
});

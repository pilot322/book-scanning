const request = require('supertest');
const app = require('../../src/app'); // Update the path to your Express app
const User = require('../../src/api/models/User');  // Adjusted for typical folder structure
const bcrypt = require('bcryptjs')

describe('Authentication API', () => {
    beforeEach(async () => {
        // Clear the user collection
        await User.deleteMany({});

        // Add a test user
        const user = new User({
            username: 'validUser',
            passwordHash: 'validPass',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            role: 'scanner',
            department: 1
        });
        await user.save();
    });


    it('should login successfully with correct credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'validUser', password: 'validPass' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Login successful');
    });

    it('should fail login with incorrect credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'validUser', password: 'invalidPass' });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe('Invalid username or password');
    });
});

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');  // Adjusted for typical folder structure
const User = require('../../src/api/models/User');  // Adjusted for typical folder structure
const bcrypt = require('bcryptjs')

// describe('MongoDB Connection Test', () => {
//     it('should connect and disconnect without error', async () => {
//         mongoose.connect('')
//         console.log('Test running...');
//         const isConnected = mongoose.connection.readyState === 1;
//         expect(isConnected).toBe(true);
//     });
// });
describe('User Model Tests', () => {
    // Test successful user creation
    it('should create a new user successfully', async () => {
        const userData = {
            username: 'testuser',
            passwordHash: 'hashedpassword',
            email: 'testuser@example.com',
            firstName: 'Test',
            lastName: 'User',
            role: 'scanner',
            department: 1
        };
        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.firstName).toBe(userData.firstName);
        expect(savedUser.lastName).toBe(userData.lastName);
        expect(savedUser.role).toBe(userData.role);
        expect(savedUser.department).toBe(userData.department);
    });

    // Test user creation fails without required fields
    it('should fail to create a user without required fields', async () => {
        const userData = {
            username: 'testuser2',
            passwordHash: 'hashedpassword',
        };
        const user = new User(userData);

        await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    // Additional test to check if role defaults to 'scanner'
    it('should default the user role to scanner', async () => {
        const userData = {
            username: 'defaultRoleUser',
            passwordHash: 'hashedpassword',
            email: 'default@example.com',
            firstName: 'Default',
            lastName: 'Role',
            department: 1
        };
        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser.role).toBe('scanner');
    });

    // Test user creation fails with invalid role
    it('should fail to create a user with an invalid role', async () => {
        const userData = {
            username: 'invalidRoleUser',
            passwordHash: 'hashedpassword',
            email: 'invalidrole@example.com',
            firstName: 'Invalid',
            lastName: 'Role',
            role: 'invalidrole',  // Invalid role
            department: 1
        };
        const user = new User(userData);

        await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });
});

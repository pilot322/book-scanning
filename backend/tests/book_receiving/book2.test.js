const request = require('supertest');
const app = require('../../src/app'); // Adjust the path to where your Express app is initialized
const User = require('../../src/api/models/User');
const Book = require('../../src/api/models/Book');
const createTestUsers = require('../createTestUsers')

// Helper to login and return the token
async function loginUser(role) {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ username: role, password: 'password' }); // Ensure these users are setup in your test db
    return res.body.token;
}



beforeAll(createTestUsers.withDelete)

describe('Book Management - Extended Tests', () => {
    let adminToken, managerToken, scannerToken;

    beforeAll(async () => {
        adminToken = await loginUser('admin');
        managerToken = await loginUser('manager');
        scannerToken = await loginUser('scanner');
    });

    describe('Create Books', () => {
        const bookData = { title: 'Unique Book', barcode: 'unique123' };

        test('Prevent duplicate books', async () => {
            // First creation should succeed
            let res = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(bookData);
            expect(res.status).toBe(201);

            // Attempt to create a duplicate should fail
            res = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(bookData);
            expect(res.status).toBe(409); // Assuming your API returns 409 for duplicate
        });

        test('Get all books', async () => {
            // Get all books should show at least one book
            const res = await request(app)
                .get('/api/books')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });

        test('Get single book', async () => {
            // Create a book and then attempt to get it
            let res = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ title: 'Get This Book', barcode: 'get123456' });
            expect(res.status).toBe(201);

            // Get the book using barcode
            res = await request(app)
                .get(`/api/books/${res.body.barcode}`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.status).toBe(200);
            expect(res.body.title).toEqual('Get This Book');
        });

        test('Update book information', async () => {
            let res = await request(app)
                .post('/api/books')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ title: 'notupdated', barcode: 'update123' });
            expect(res.status).toBe(201); //
            console.log('PLEASE PLEASE PLEASE')

            // Assuming there's a book with barcode `update123`
            res = await request(app)
                .put(`/api/books/update123`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ title: 'Updated Title' });
            expect(res.status).toBe(200);  // Assuming you have a book with this barcode

            // Verify update took effect
            res = await request(app)
                .get(`/api/books/update123`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.status).toBe(200);
            expect(res.body.title).toEqual('Updated Title');
        });

        test('Unauthorized user cannot update books', async () => {
            // Scanner tries to update a book
            const res = await request(app)
                .put(`/api/books/update123`)
                .set('Authorization', `Bearer ${scannerToken}`)
                .send({ title: 'Should Fail' });
            expect(res.status).toBe(403);
        });
    });

    describe('Delete Books', () => {
        test('Non-existent book cannot be deleted', async () => {
            const res = await request(app)
                .delete(`/api/books/nonexistentbarcode`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.status).toBe(404);
        });
    });
});

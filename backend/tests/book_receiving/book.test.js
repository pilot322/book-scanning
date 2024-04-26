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

describe('Book Management', () => {
    let adminToken, managerToken, scannerToken;

    beforeAll(async () => {
        adminToken = await loginUser('admin');
        managerToken = await loginUser('manager');
        scannerToken = await loginUser('scanner');
    });

    test('Only admin and manager should create books', async () => {
        const bookData1 = { title: 'New Book1', barcode: '123456' };
        const bookData2 = { title: 'New Book2', barcode: '549775' };
        const bookData3 = { title: 'New Book3', barcode: '216456' };

        // Admin creates a book
        let res = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(bookData1);
        expect(res.status).toBe(201);

        // Manager creates a book
        res = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${managerToken}`)
            .send(bookData2);
        expect(res.status).toBe(201);

        // Scanner tries to create a book
        res = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${scannerToken}`)
            .send(bookData3);
        expect(res.status).toBe(403);
    });

    test('Only admin can delete books', async () => {
        // Assuming there's a book with id `bookId`
        const bookBarcode = '549775';

        // Admin deletes a book
        let res = await request(app)
            .delete(`/api/books/${bookBarcode}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);

        // Manager tries to delete a book
        res = await request(app)
            .delete(`/api/books/${bookBarcode}`)
            .set('Authorization', `Bearer ${managerToken}`);
        expect(res.status).toBe(403);

        // Scanner tries to delete a book
        res = await request(app)
            .delete(`/api/books/${bookBarcode}`)
            .set('Authorization', `Bearer ${scannerToken}`);
        expect(res.status).toBe(403);
    });
});

const request = require('supertest');
const app = require('../../src/app'); // Adjust the path to where your Express app is initialized
const User = require('../../src/api/models/User');
const Book = require('../../src/api/models/Book');
const Session = require('../../src/api/models/Session');
const { loginUser, createUsers, createBooks, userTokens } = require('../testUtils');


let book1;
let book2;
let book3;
let book4;

beforeAll(async () => {
    await createUsers(true);

    adminToken = await loginUser('admin', app);
    managerToken = await loginUser('manager', app);
    scannerToken = await loginUser('scanner', app);

    await createBooks();

    book1 = await Book.findOne({ title: 'book1' });
    book2 = await Book.findOne({ title: 'book2' });
    book3 = await Book.findOne({ title: 'book3' });
    book4 = await Book.findOne({ title: 'book4' });
})

// Assuming you've already set up Jest and supertest
describe('Session Management', () => {


    test('Start a session', async () => {
        const res = await request(app)
            .post('/api/sessions/start')
            .set('Authorization', `Bearer ${scannerToken}`)
            .send({ book: book1._id, sessionType: 'scanning', startPage: 1 });
        expect(res.status).toBe(201);
        expect(res.body.user).toBeTruthy();
        expect(res.body.status).toBe('in_progress');
    });

    test('End a session', async () => {
        // Start a new session first
        await request(app)
            .post('/api/sessions/start')
            .set('Authorization', `Bearer ${managerToken}`)
            .send({ book: book2._id, sessionType: 'scanning', startPage: 1 });

        const res = await request(app)
            .post(`/api/sessions/stop`)  // Assuming you have an endpoint to end the session
            .set('Authorization', `Bearer ${managerToken}`)
            .send({ stopPage: 10 });

        expect(res.status).toBe(201);
        //console.log('ok ' + res.body)
        expect(res.body.status).toBe('finished');
    });

    test('Cannot perform actions during an active session', async () => {

        // Try to start another session
        const res = await request(app)
            .post('/api/sessions/start')
            .set('Authorization', `Bearer ${scannerToken}`)
            .send({ book: book4._id, sessionType: 'scanning', startPage: 20 });

        expect(res.status).toBe(403);
        expect(res.body.error).toContain('Active session in progress');
    });
});

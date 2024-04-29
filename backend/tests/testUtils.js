const User = require('../src/api/models/User');
const Book = require('../src/api/models/Book');
const request = require('supertest');

const userTokens = {};
const books = {};

exports.userTokens = userTokens;
exports.books = books;

exports.createUsers = async (del) => {
    if (del)
        await User.deleteMany({});

    await new User({
        username: 'admin',
        passwordHash: 'password',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Giorgos',
        lastName: 'User',
        role: 'admin',
        department: 1
    }).save();

    await new User({
        username: 'manager',
        passwordHash: 'password',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Makhs',
        lastName: 'User',
        role: 'manager',
        department: 1
    }).save();

    await new User({
        username: 'scanner',
        passwordHash: 'password',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'scanner',
        department: 1
    }).save();

    await new User({
        username: 'giorgos',
        passwordHash: 'giorgos123',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Giorgos',
        lastName: 'User',
        role: 'scanner',
        department: 1
    }).save();

    await new User({
        username: 'makhs',
        passwordHash: 'makhs123',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Makhs',
        lastName: 'User',
        role: 'scanner',
        department: 1
    }).save();

    await new User({
        username: 'validUser',
        passwordHash: 'validPass',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'scanner',
        department: 1
    }).save();
};

exports.createBooks = async () => {
    const admin = await User.findByUsername('admin');

    const bookData = [
        { title: 'book1', barcode: '1234', receiver: admin._id },
        { title: 'book2', barcode: '5678', receiver: admin._id },
        { title: 'book3', barcode: '9876', receiver: admin._id },
        { title: 'book4', barcode: '1010', receiver: admin._id }
    ]

    for (const data of bookData) {
        books[data.title] = (await new Book(data).save())._id;
    }
}

// Helper to login and return the token
exports.loginUser = async (role, app) => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ username: role, password: 'password' }); // Ensure these users are setup in your test db
    userTokens[role] = res.body.token;
    return res.body.token;
}

exports.startScanningSession = async (userName, book, app) => {
    const res = await request(app)
        .post('/api/sessions/start')
        .set('Authorization', `Bearer ${userTokens[userName]}`)
        .send({ book: book._id, sessionType: 'scanning', startPage: 1 });
}
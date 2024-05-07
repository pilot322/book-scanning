const express = require('express');
require('dotenv').config();
const bookRouter = require('./api/routes/bookRouter');
const sessionRouter = require('./api/routes/sessionRouter');
const userRouter = require('./api/routes/userRouter');
const authRouter = require('./api/routes/authRouter');
const cors = require('cors');
const app = express();
const authenticate = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const refreshRouter = require('./api/routes/refreshRouter');


const mongoose = require('mongoose');

const globalSetup = require('../tests/globalSetup');
const createTestUsers = require('../tests/createTestUsers');
async function dbSetup() {
    await globalSetup();
    await mongoose.connect(process.env['MONGO_URI']);
    await createTestUsers.withDelete();
}

dbSetup();

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin to access the API
    optionsSuccessStatus: 200,         // For legacy browser support
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));  // Enable CORS with options

//

app.use(express.json());

//

app.use(cookieParser());

//
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);

app.use(authenticate);

app.use('/api/books', bookRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', userRouter);


module.exports = app;

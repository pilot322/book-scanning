const express = require('express');
const booksRouter = require('./api/routes/booksRouter');
const sessionsRouter = require('./api/routes/sessionsRouter');
const usersRouter = require('./api/routes/usersRouter');
const app = express();


// TODO - to middleware

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin to access the API
    optionsSuccessStatus: 200         // For legacy browser support
};

app.use(cors(corsOptions));  // Enable CORS with options


app.use(express.json());
app.use('/api/books', booksRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);

module.exports = app;

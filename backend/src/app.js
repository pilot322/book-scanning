const express = require('express');
const bookRouter = require('./api/routes/bookRouter');
const sessionRouter = require('./api/routes/sessionRouter');
const userRouter = require('./api/routes/userRouter');
const cors = require('cors');
const app = express();


// TODO - to middleware

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin to access the API
    optionsSuccessStatus: 200         // For legacy browser support
};

app.use(cors(corsOptions));  // Enable CORS with options

//

app.use(express.json());
app.use('/api/books', bookRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', userRouter);

module.exports = app;

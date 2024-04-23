const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
// CORS options

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin to access the API
    optionsSuccessStatus: 200         // For legacy browser support
};

app.use(cors(corsOptions));  // Enable CORS with options


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/test', (req, res) => {
    res.send(
        {
            message: 'it\'s working!'
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

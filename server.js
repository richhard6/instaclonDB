require('dotenv').config();

const { PORT } = process.env;

const express = require('express');

const morgan = require('morgan');
const { registerUser, loginUser } = require('./controllers/users');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.post('/user/register', registerUser);

app.post('/user/login', loginUser);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

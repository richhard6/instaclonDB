require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');

const morgan = require('morgan');
const doOrRemoveLike = require('./controllers/likes/doOrRemoveLike');
const { newPost, searchPostByCaption } = require('./controllers/posts');
const {
    registerUser,
    loginUser,
    checkUserProfile,
} = require('./controllers/users');
const updateProfile = require('./controllers/users/updateProfile');
const authUser = require('./middlewares/authUser');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(fileUpload());

app.post('/users/register', registerUser);

app.post('/users/login', loginUser);

app.get('/users/:userId', checkUserProfile);

app.put('/users/me', authUser, updateProfile);

app.post('/posts/newPost', authUser, newPost);

app.get('/posts', searchPostByCaption);

app.post('/posts/:postId/like', authUser, doOrRemoveLike);

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

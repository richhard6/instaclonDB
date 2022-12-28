require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const addComment = require('./controllers/comments/addComment');
const doOrRemoveLike = require('./controllers/likes/doOrRemoveLike');
const { newPost, searchPostByCaption } = require('./controllers/posts');
const {
    registerUser,
    loginUser,
    checkUserProfile,
    updateProfile,
    getOwnUser,
} = require('./controllers/users');

const authUser = require('./middlewares/authUser');
const authUserOptional = require('./middlewares/authUser');
const deletePost = require('./controllers/posts/deletePost');
const postExists = require('./middlewares/postExists');

const app = express();

app.use(cors());

app.use(morgan('dev'));

// parse application/x-www-form-urlencoded

// parse application/json

app.use(express.json());

app.use(fileUpload());

app.use(express.static('uploads'));

app.get('/hola', (req, res) => {
    res.send({ status: 'ok', message: 'влуат' });
});

app.post('/users/register', registerUser);

app.post('/users/login', loginUser);

app.get('/users/me/profile', authUser, getOwnUser);

app.put('/users/me', authUser, updateProfile);

app.get('/users/:userId', authUser, checkUserProfile);

/* app.get('/users/:userId', (req, res) => {
    res.send({ status: 'ok', message: 'влуат' });
}); */

app.post('/posts/newPost', authUser, newPost);

app.get('/posts', authUser, searchPostByCaption);

app.post('/posts/:postId/like', authUser, doOrRemoveLike);

app.post('/posts/:postId/comment', authUser, addComment);

app.delete('/posts/:postId', authUser, postExists, deletePost);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

app.use((req, res) => {
    console.log(res);
    res.status(404).send({
        status: 'error',
        message: res.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

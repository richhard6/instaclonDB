const fs = require('fs/promises');
const selectCommentsByPostId = require('./db/commentsQueries/selectCommentsByPostId');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createDirIfNotExists = async (path) => {
    try {
        await fs.access(path);
    } catch {
        await fs.mkdir(path);
    }
};

const addCommentsToPost = async (posts) => {
    const postId = posts.map((post) => post.id);

    for (let i = 0; i < postId.length; i++) {
        const comments = await selectCommentsByPostId(postId[i]);
        if (comments.length > 0) {
            for (let j = 0; j < comments.length; j++) {
                for (let k = 0; k < posts.length; k++) {
                    if (comments[j].postId === posts[k].id) {
                        posts[k].comments = [...comments];
                    }
                }
            }
        }
    }
};

module.exports = { generateError, createDirIfNotExists, addCommentsToPost };

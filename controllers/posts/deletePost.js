const deletePostDb = require('../../db/postsQueries/deletePostDb');
const selectPostById = require('../../db/postsQueries/selectPostById');
const { generateError, deletePhoto } = require('../../helpers');

const deletePost = async (req, res, next) => {
    try {
        console.log('????');
        const { postId } = req.params;

        const post = await selectPostById(postId);

        if (req.userId !== post.userId) {
            throw generateError('You are not the owner of this post ', 401);
        }

        if (post.picture) {
            await deletePhoto(post.picture);
        }
    } catch (e) {
        next(e);
    }
};

module.exports = deletePost;

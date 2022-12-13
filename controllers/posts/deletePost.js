const deletePostDb = require('../../db/postsQueries/deletePostDb');
const selectPostById = require('../../db/postsQueries/selectPostById');
const { generateError, deletePhoto } = require('../../helpers');

const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await selectPostById(postId);

        const { user } = req;

        if (user.id !== post.userId) {
            throw generateError('You are not the owner of this post ', 401);
        }

        if (post.picture) {
            await deletePhoto(post.picture);
        }

        await deletePostDb(post.id);

        res.send({
            status: 'ok',
            message: 'Post deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deletePost;

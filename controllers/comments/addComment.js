const insertComment = require('../../db/commentsQueries/insertComment');
const { generateError } = require('../../helpers');

const addComment = async (req, res, next) => {
    try {
        const { id } = req.user;

        const { postId } = req.params;

        const { comment } = req.body;

        if (!comment || comment.trim().length === 0)
            throw generateError(
                'You must add some characters to make a comment',
                400
            );

        if (comment.length > 200)
            throw generateError(
                'The comment cannot exceed the 200 characters',
                400
            );

        await insertComment(id, postId, comment);

        res.send({ status: 'ok', message: 'comment added' });
    } catch (err) {
        next(err);
    }
};

module.exports = addComment;

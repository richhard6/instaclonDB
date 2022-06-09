const insertOrDeleteLike = require('../../db/likesQueries/insertOrDeleteLike');

const doOrRemoveLike = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { postId } = req.params;

        const [likedOrRemoved] = await insertOrDeleteLike(userId, postId);

        res.send({
            status: 'ok',
            message: `${
                likedOrRemoved.insertId === 0 ? 'Disliked post' : 'Liked post'
            }`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = doOrRemoveLike;

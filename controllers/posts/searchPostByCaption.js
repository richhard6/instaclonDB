const selectPostByCaption = require('../../db/postsQueries/selectPostByCaption');
const { generateError, addCommentsToPost } = require('../../helpers');

const searchPostByCaption = async (req, res, next) => {
    try {
        const { query } = req.query;

        const id = req.user?.id;

        const [posts] = await selectPostByCaption(id, query);

        await addCommentsToPost(posts);

        if (posts.length < 1)
            throw generateError(`There's no posts matching your query`, 404);

        res.send({ status: 'ok', data: posts });
    } catch (err) {
        next(err);
    }
};

module.exports = searchPostByCaption;

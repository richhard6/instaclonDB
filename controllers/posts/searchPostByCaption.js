const selectPostByCaption = require('../../db/postsQueries/selectPostByCaption');

const searchPostByCaption = async (req, res, next) => {
    try {
        const { query } = req.query;

        const [posts] = await selectPostByCaption(query);

        console.log(posts);

        res.send({ status: 'ok', data: posts });
    } catch (err) {
        next(err);
    }
};

module.exports = searchPostByCaption;

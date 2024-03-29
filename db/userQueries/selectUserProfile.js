const { generateError, addCommentsToPost } = require('../../helpers');
const getConnection = require('../getConnection');
const selectPostsByUID = require('../postsQueries/selectPostsByUID');

const selectUserProfile = async (userId, ownUserId) => {
    let connection;
    try {
        connection = await getConnection();

        const [[user]] = await connection.query(
            `
        SELECT username FROM users WHERE id = ?
`,
            [userId]
        );

        if (!user) {
            throw generateError('User doesn`t exists', 404);
        }

        const [posts] = await selectPostsByUID(userId, ownUserId);

        await addCommentsToPost(posts);

        return {
            user,
            posts,
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserProfile;

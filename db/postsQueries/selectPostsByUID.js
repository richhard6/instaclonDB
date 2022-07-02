const getConnection = require('../getConnection');

const selectPostsByUID = async (userId, ownUserId) => {
    let connection;

    try {
        connection = await getConnection();

        return await connection.query(
            `
        SELECT U.username, P.picture, P.caption, P.likes, P.createdAt, P.userId, P.id, BIT_OR(L.userId = ?) AS likedByMe 
        FROM posts P 
        LEFT JOIN likes L
        ON P.id = L.postId
        LEFT JOIN users U
        ON P.userId = U.id
        WHERE P.userId = ?
        GROUP BY P.id
        ORDER BY P.createdAt DESC
`,
            [ownUserId, userId]
        );
    } finally {
        connection.release();
    }
};

module.exports = selectPostsByUID;

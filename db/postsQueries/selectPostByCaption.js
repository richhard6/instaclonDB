const getConnection = require('../getConnection');

const selectPostByCaption = async (userId, text) => {
    let connection;

    try {
        connection = await getConnection();

        if (text) {
            return await connection.query(
                `
            SELECT U.username, P.picture, P.caption, P.likes, P.createdAt, P.userId, P.id, BIT_OR(L.userId = ?) AS likedByMe 
            FROM posts P
            LEFT JOIN likes L
            ON P.id = L.postId
            LEFT JOIN users U
            ON P.userId = U.id
            WHERE caption LIKE ?
            GROUP BY P.id
            ORDER BY P.createdAt DESC
    `,
                [userId, `%${text}%`]
            );
        }

        return await connection.query(
            `
            SELECT U.username, P.picture, P.caption, P.likes, P.createdAt, P.userId, P.id, BIT_OR(L.userId = ?) AS likedByMe 
            FROM posts P
            LEFT JOIN likes L
            ON P.id = L.postId
            LEFT JOIN users U
            ON P.userId = U.id
            GROUP BY P.id
            ORDER BY P.createdAt DESC
    `,
            [userId]
        );
    } finally {
        connection.release();
    }
};

module.exports = selectPostByCaption;

const getConnection = require('../getConnection');

const selectCommentsByPostId = async (postId) => {
    let connection;

    try {
        connection = await getConnection();

        let comments = await connection.query(
            `
        SELECT C.id, C.comment, C.createdAt, U.username, C.postId
        FROM comments C
        LEFT JOIN users U
        ON C.userId = U.id
        WHERE postId = ?
        `,
            [postId]
        );

        return comments[0];
    } finally {
        connection.release();
    }
};
module.exports = selectCommentsByPostId;

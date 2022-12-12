const getConnection = require('../getConnection');

const selectPostById = async (postId) => {
    let connection;

    try {
        connection = await getConnection();

        const [post] = await connection.query(
            `
                SELECT P.id, P.userId, U.username, P.picture, P.createdAt
                FROM posts P
                LEFT JOIN users U
                ON P.userId = U.id
                WHERE P.id = ?
                GROUP BY P.id
            `,
            [postId]
        );

        return post[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPostById;

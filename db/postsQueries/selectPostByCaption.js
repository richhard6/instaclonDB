const getConnection = require('../getConnection');

const selectPostByCaption = async (text) => {
    let connection;

    try {
        connection = await getConnection();

        if (text) {
            return await connection.query(
                `
        SELECT U.username, P.picture, P.caption, P.likes 
        FROM posts P
        LEFT JOIN users U
        ON P.userId = U.id
        WHERE caption LIKE ?
        ORDER BY P.createdAt DESC
    `,
                [`%${text}%`]
            );
        }

        return await connection.query(
            `
        SELECT U.username, P.picture, P.caption, P.likes 
        FROM posts P
        LEFT JOIN users U
        ON P.userId = U.id
        ORDER BY P.createdAt DESC
    `
        );
    } finally {
        connection.release();
    }
};

module.exports = selectPostByCaption;

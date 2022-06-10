const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const insertComment = async (userId, postId, comment) => {
    let connection;

    try {
        connection = await getConnection();

        const [[post]] = await connection.query(
            ` 
        SELECT id FROM posts WHERE id = ? 
        `,
            [postId]
        );

        if (!post) {
            throw generateError(
                'The post you trying to comment doesn`t exists',
                404
            );
        }

        return await connection.query(
            `
        INSERT INTO comments(userId,postId,comment)
        VALUES(?,?,?)
        `,
            [userId, postId, comment]
        );
    } finally {
        connection.release;
    }
};

module.exports = insertComment;

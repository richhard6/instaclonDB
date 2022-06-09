const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const insertOrDeleteLike = async (userId, postId) => {
    let connection;

    try {
        connection = await getConnection();

        const [post] = await connection.query(
            ` 
        SELECT id FROM posts WHERE id = ? 
        `,
            [postId]
        );

        if (post.length > 0) {
            const [like] = await connection.query(
                ` 
            SELECT id FROM likes WHERE userId = ? AND postId = ? 
            `,
                [userId, postId]
            );

            if (like.length > 0) {
                return await connection.query(
                    `DELETE FROM likes WHERE id = ?`,
                    [like[0].id]
                );
            } else {
                const insertedLike = await connection.query(
                    `INSERT INTO likes (userId, postId) 
                     VALUES(?,?)`,
                    [userId, postId]
                );

                await connection.query(
                    `
                    UPDATE posts SET likes = (SELECT COUNT(*) FROM likes WHERE postId = ?) WHERE id = ?
                `,
                    [postId, postId]
                );

                return insertedLike;
            }
        } else {
            throw generateError('Cannot find the post you want to like', 404);
        }
    } finally {
        connection.release();
    }
};

module.exports = insertOrDeleteLike;

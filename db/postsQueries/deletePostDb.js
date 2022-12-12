const getConnection = require('../getConnection');

const deletePostDb = async (postId) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`DELETE FROM posts WHERE id = ?`, [postId]);
        [postId];
    } finally {
        connection.release();
    }
};

module.exports = deletePostDb;

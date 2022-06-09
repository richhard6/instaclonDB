const getConnection = require('../getConnection');

const selectPostsByUID = async (userId) => {
    let connection;

    try {
        connection = await getConnection();

        return await connection.query(
            `
        SELECT id, picture, caption, likes FROM posts WHERE userId = ?
`,
            [userId]
        );
    } finally {
        connection.release();
    }
};

module.exports = selectPostsByUID;

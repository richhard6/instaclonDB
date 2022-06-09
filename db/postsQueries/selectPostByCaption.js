const getConnection = require('../getConnection');

const selectPostByCaption = async (text) => {
    let connection;

    try {
        connection = await getConnection();

        return await connection.query(
            `
    SELECT userId, picture, caption, likes FROM posts WHERE caption LIKE ?
`,
            [`%${text}%`]
        );
    } finally {
        connection.release();
    }
};

module.exports = selectPostByCaption;

const getConnection = require('../getConnection');

const selectUserById = async (userId) => {
    let connection;

    try {
        connection = await getConnection();

        const user = await connection.query(
            `
        SELECT username, password FROM users WHERE id = ? 
        `,
            [userId]
        );

        return user[0];
    } finally {
        connection.release();
    }
};

module.exports = selectUserById;

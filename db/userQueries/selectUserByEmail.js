const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectUserByEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        const [user] = await connection.query(
            `
            SELECT id, username, password FROM users WHERE email = ? 
        `,
            [email]
        );

        if (user.length < 1) throw generateError('User not found', 404);

        return user[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByEmail;

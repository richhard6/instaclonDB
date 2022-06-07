const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const insertUser = async (email, password) => {
    let connection;

    try {
        connection = await getConnection();

        const [user] = await connection.query(
            `
        SELECT id FROM users WHERE email = ?
        `,
            [email]
        );

        if (user.length > 0) throw generateError('This email is being used...');

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await connection.query(
            `
        INSERT INTO users (email,password) VALUES(?,?)
        `,
            [email, hashedPassword]
        );

        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUser;

const getConnection = require('../getConnection');
const selectUserById = require('./selectUserById');
const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');

const updateUser = async (id, username, password, newPassword) => {
    let connection;

    try {
        connection = await getConnection();

        const [user] = await selectUserById(id);

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword)
            throw generateError(
                'Incorrect password, cannot update profile',
                403
            );

        if (!username || !password)
            throw generateError(
                'You must add a new password or new username to update your profile'
            );

        if (username && newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await connection.query(
                `UPDATE users SET password=?, username=? WHERE id= ?;`,
                [hashedPassword, username, id]
            );
            return 'Username and Password updated';
        }

        if (username) {
            await connection.query(`UPDATE users SET username=? WHERE id= ?;`, [
                username,
                id,
            ]);
            return 'Username updated';
        }

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await connection.query(`UPDATE users SET password=? WHERE id= ?;`, [
                hashedPassword,
                id,
            ]);
            return 'Password updated';
        }
    } finally {
        connection.release();
    }
};

module.exports = updateUser;

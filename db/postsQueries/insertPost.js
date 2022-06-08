const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const insertPost = async (userId, picture, caption = '') => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
        INSERT INTO posts (userId, picture, caption) 
        VALUES(?,?,?)
        `,
            [userId, picture, caption]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPost;

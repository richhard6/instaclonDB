const getConnection = require('../db/getConnection');
const { generateError } = require('../helpers');

const postExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        const { postId } = req.params;

        const [posts] = await connection.query(
            `SELECT id FROM posts WHERE id = ?`,
            [postId]
        );

        if (posts.length < 1) {
            throw generateError('Post can`t be found', 404);
        }

        // Saltamos al siguiente controlador.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = postExists;

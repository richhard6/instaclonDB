const insertUser = require('../../db/userQueries/insertUser');
const { generateError } = require('../../helpers');

const registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !password || !username)
            throw generateError('Missing fields', 400);

        const userId = await insertUser(email, username, password);

        res.send({ status: 'ok', message: `user created with id ${userId}` });
    } catch (err) {
        next(err);
    }
};

module.exports = registerUser;

const selectUserByEmail = require('../../db/userQueries/selectUserByEmail');
const { generateError } = require('../../helpers');

const { SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await selectUserByEmail(email);
        const validatePassword = await bcrypt.compare(password, user.password);
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, SECRET, { expiresIn: '30d' });

        if (!email || !password) throw generateError('Missing fields', 400);

        if (!validatePassword)
            throw generateError('Password or Email incorrect', 401);

        res.send({ status: 'ok', data: { token } });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;

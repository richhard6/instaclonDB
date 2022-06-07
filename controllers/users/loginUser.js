const selectUserByEmail = require('../../db/userQueries/selectUserByEmail');
const { generateError } = require('../../helpers');

const { SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw generateError('Missing fields', 400);

        const user = await selectUserByEmail(email);

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword)
            throw generateError('Password or Email incorrect', 401);

        const payload = { id: user.id, username: user.username };

        console.log(payload);

        const token = jwt.sign(payload, SECRET, { expiresIn: '30d' });

        res.send({ status: 'ok', data: { token } });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;

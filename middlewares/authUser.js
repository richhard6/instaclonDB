const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const { SECRET } = process.env;

const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization)
            throw generateError('Authorization header needed', 401);

        let token;

        try {
            token = jwt.verify(authorization, SECRET);
        } catch (err) {
            throw generateError('Wrong token', 401);
        }

        req.user = token;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;

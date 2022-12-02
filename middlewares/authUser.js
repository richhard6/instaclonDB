const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

//refactorizar esta cagada.
const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (authorization) {
            let token;
            try {
                token = jwt.verify(authorization, process.env.SECRET);
            } catch {
                throw generateError('Token incorrecto', 401);
            }
            req.user = token;
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;

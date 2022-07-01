const selectUserById = require('../../db/userQueries/selectUserById');
const getOwnUser = async (req, res, next) => {
    try {
        const user = await selectUserById(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOwnUser;

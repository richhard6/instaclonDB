const updateUser = require('../../db/userQueries/updateUser');
const { generateError } = require('../../helpers');

const updateProfile = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { username, password, newPassword } = req.body;
        const message = await updateUser(id, username, password, newPassword);

        if (!password)
            throw generateError(
                'You must put your password again to update your profile',
                403
            );

        res.send({ status: 'ok', message });
    } catch (err) {
        next(err);
    }
};

module.exports = updateProfile;

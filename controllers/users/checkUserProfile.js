const selectUserProfile = require('../../db/userQueries/selectUserProfile');

const checkUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const ownUserId = req.user?.id;

        const userProfile = await selectUserProfile(userId, ownUserId);

        res.send({ status: 'ok', data: userProfile });
    } catch (err) {
        next(err);
    }
};

module.exports = checkUserProfile;

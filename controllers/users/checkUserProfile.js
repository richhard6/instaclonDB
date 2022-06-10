const selectUserProfile = require('../../db/userQueries/selectUserProfile');

const checkUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const userProfile = await selectUserProfile(userId);

        res.send({ status: 'ok', data: userProfile });
    } catch (err) {
        next(err);
    }
};

module.exports = checkUserProfile;

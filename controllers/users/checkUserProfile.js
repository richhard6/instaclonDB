const selectUserProfile = require('../../db/userQueries/selectUserProfile');

const checkUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const userProfile = await selectUserProfile(userId);

        console.log(userProfile);

        res.send({ status: 'ok', data: userProfile });
    } catch (err) {
        next(err);
    }
};

module.exports = checkUserProfile;

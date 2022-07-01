const checkUserProfile = require('./checkUserProfile');
const loginUser = require('./loginUser');
const registerUser = require('./registerUser');
const updateProfile = require('./updateProfile');
const getOwnUser = require('./getOwnUser');

module.exports = {
    registerUser,
    loginUser,
    checkUserProfile,
    updateProfile,
    getOwnUser,
};

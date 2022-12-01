const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const insertPost = require('../../db/postsQueries/insertPost');
const { generateError, createDirIfNotExists } = require('../../helpers');

const newPost = async (req, res, next) => {
    try {
        const { caption } = req.body;
        const { id } = req.user;
        const { image } = req.files;
        const uploadDir = path.join(__dirname, '..', '..', 'uploads');
        const sharpImg = sharp(image.data);
        const pictureName = `${nanoid(24)}.jpg`;
        const imgPath = path.join(uploadDir, pictureName);

        if (!req.files?.image)
            throw generateError('You must add an image to the post', 400);

        if (image.mimetype !== 'image/png' && image.mimetype !== 'image/jpeg')
            throw generateError('Wrong image type', 400);

        await createDirIfNotExists(uploadDir);

        sharpImg.resize(500);

        await sharpImg.toFile(imgPath);

        await insertPost(id, pictureName, caption);

        res.send({ status: 'ok', message: 'Post uploaded successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = newPost;

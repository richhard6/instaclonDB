const fs = require('fs/promises');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createDirIfNotExists = async (path) => {
    try {
        //intentamos acceder al directorio
        await fs.access(path);
    } catch {
        //si no es posible acceder al directorio en el try
        // arrojaria u error, si es asi, creamos un directorio

        await fs.mkdir(path);
    }
};

module.exports = { generateError, createDirIfNotExists };

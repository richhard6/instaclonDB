require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool;

const getConnection = async () => {
    //si no hay grupo de conexiones lo creamos
    try {
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'local',
            });
        }

        return await pool.getConnection();
    } catch (error) {
        throw new Error('error connecting to mysql or db not found');
    }
};

module.exports = getConnection;

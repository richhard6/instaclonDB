const getConnection = require('./getConnection');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log('deleting tables...');

        await connection.query(`DROP TABLE IF EXISTS likes`);
        await connection.query(`DROP TABLE IF EXISTS comments`);
        await connection.query(`DROP TABLE IF EXISTS posts`);
        await connection.query(`DROP TABLE IF EXISTS users`);

        console.log('creating tables');

        await connection.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
        CREATE TABLE posts (
            id INT PRIMARY KEY AUTO_INCREMENT,
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            picture VARCHAR(100) NOT NULL,
            caption VARCHAR(200),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
                )
            `);

        await connection.query(`
        CREATE TABLE likes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            postId INT NOT NULL,
            FOREIGN KEY (postId) REFERENCES posts(id),
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
        `);

        await connection.query(`
        CREATE TABLE comments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            postId INT NOT NULL,
            FOREIGN KEY (postId) REFERENCES posts(id),
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            comment VARCHAR(200) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
        `);

        console.log('tables created');
    } catch (err) {
        console.log(err);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
}

main();

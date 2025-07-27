import { connection } from '../config/db.js';

export const userTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            _id VARCHAR(255) PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            userlogo VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            level ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2') DEFAULT 'A1',
            role ENUM('user', 'vip', 'admin') DEFAULT 'user'
        )
    `;

    try {
        await connection.query(createTableQuery);
        console.log('Users table created or already exists');
    } catch (err) {
        console.error('Error creating users table:', err);
    }
};
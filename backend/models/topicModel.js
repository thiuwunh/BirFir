import { connection } from '../config/db.js';

export const topicTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS topics (
            id INT AUTO_INCREMENT PRIMARY KEY,
            topic_name VARCHAR(255) NOT NULL,
            topic_level ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2') DEFAULT 'A1',
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            title VARCHAR(255) NOT NULL,
            context LONGTEXT NOT NULL
        )
    `;

    try {
        await connection.query(createTableQuery);
        console.log('Topics table created or already exists');
    } catch (err) {
        console.error('Error creating topics table:', err);
    }
}
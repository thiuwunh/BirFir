// db.js
import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',       // hoặc user khác
  password: 'thiuwunh6807',
  database: 'test',
});

export const connectDB = async () => {
    try {
        await connection.query('SELECT 1');
        console.log('Đã kết nối MySQL');
    } catch (err) {
        console.error('Kết nối MySQL thất bại:', err);
    }
}
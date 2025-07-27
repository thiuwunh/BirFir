import { connection } from '../config/db.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import crypto from 'crypto';

// Register a new user
export const register = async (req, res) => {

    // userTable(); 
    const { username, email, password, confirmPassword, level } = req.body;

    // Validate input
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ thông tin bắt buộc' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Mật khẩu nhập lại không khớp' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
    }
    // Kiểm tra độ mạnh của mật khẩu
    // Yêu cầu: ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
    const strongPassword = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    });
    if (!strongPassword) {
        return res.status(400).json({ success: false, message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt' });
    }

    // Check if user already exists
    try {
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const userId = crypto.randomUUID();
        const userLevel = level || 'A1';
        const role = 'user';

        await connection.query(
            'INSERT INTO users (_id, username, email, password, level, role) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, username, email, hashedPassword, userLevel, role]
        );

        res.status(201).json({ success: true, message: 'Đăng ký thành công', user: { username } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: err.message });
    }
}

// Login an existing user
export const login = async (req, res) => {

    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tài khoản và mật khẩu' });
    }

    try {
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Tài khoản không tồn tại' });
        }
        const user = rows[0];

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Mật khẩu không đúng' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, token: token, user: { username: user.username, level: user.level, role: user.role } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: err.message });
    }
}

export const listUsers = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT _id, username, firstname, lastname, userlogo, email, password, level, role FROM users');
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: err.message });
    }
}
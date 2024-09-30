// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// 生成 JWT
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// 處理註冊邏輯
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user.id);
        res.status(201).json({ user: user.id, token });
    } catch (error) {
        res.status(400).json({ error: '註冊失敗，請重試' });
    }
};

// 處理登入邏輯
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && (await user.matchPassword(password))) {
            const token = createToken(user.id);
            
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1小時
            
            res.cookie('user', JSON.stringify({
                id: user.id,
                name: user.username,
                email: user.email
            }), { maxAge: 3600000 }); // 1小時
            
            // 使用 return 確保函數在此結束
            return res.redirect('/backend/dashboard');
        } else {
            return res.status(400).json({ error: '無效的登入憑證' });
        }
    } catch (error) {
        console.error('登入錯誤:', error);
        return res.status(400).json({ error: '登入失敗，請重試' });
    }
};

// 處理登出邏輯
exports.logout = (req, res) => {
    // 清除 token 和 user cookies
    res.clearCookie('token');
    res.clearCookie('user');
    
    // 重定向到登入頁面
    res.redirect('/login');
};

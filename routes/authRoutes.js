// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// 顯示登入頁面 (GET 請求)
router.get('/login', (req, res) => {
    res.render('login', { title: '登入頁面', cookies: req.cookies });
});

// 處理登入表單提交 (POST 請求)
router.post('/login', login);

// 顯示註冊頁面 (GET 請求)
router.get('/register', (req, res) => {
    res.render('register', { title: '註冊頁面', cookies: req.cookies });
});

// 處理註冊表單提交 (POST 請求)
router.post('/register', register);

router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.clearCookie('token');
    res.redirect('/auth/login');
});

module.exports = router;

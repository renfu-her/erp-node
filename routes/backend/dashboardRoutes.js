// routes/backend/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/authMiddleware');
const dashboardController = require('../../controllers/dashboardController');

// 只有已登入的使用者才能訪問此路由
router.get('/dashboard', (req, res) => {
  console.log('Route Cookies:', req.cookies);  // 添加這行來調試
  res.render('dashboard', {
    title: '儀表板',
    cookies: req.cookies
  });
});

module.exports = router;

// routes/backend/accountingRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/authMiddleware');
const accountingController = require('../../controllers/accountingController');

// 顯示會計管理頁面
router.get('/accounting', isAuthenticated, (req, res) => {
  accountingController.showAccountingPage(req, res, { cookies: req.cookies });
});

module.exports = router;

// routes/backend/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/authMiddleware');
const inventoryController = require('../../controllers/inventoryController');

// 顯示進銷存管理頁面
router.get('/inventory', isAuthenticated, (req, res) => {
  inventoryController.showInventoryPage(req, res, { cookies: req.cookies });
});

module.exports = router;

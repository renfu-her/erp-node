// routes/backend/hrRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../middlewares/authMiddleware');
const hrController = require('../../controllers/hrController');

// 只有已登入的使用者才能訪問此路由
router.get('/hr', isAuthenticated, (req, res) => {
  hrController.showHRPage(req, res, { cookies: req.cookies });
});

router.post('/hr/add', isAuthenticated, (req, res) => {
  hrController.addEmployee(req, res, { cookies: req.cookies });
});

router.post('/hr/edit/:id', isAuthenticated, (req, res) => {
  hrController.editEmployee(req, res, { cookies: req.cookies });
});

router.post('/hr/delete/:id', isAuthenticated, (req, res) => {
  hrController.deleteEmployee(req, res, { cookies: req.cookies });
});

router.get('/hr/grades', isAuthenticated, (req, res) => {
  hrController.getInsuranceGrades(req, res, { cookies: req.cookies });
});

router.post('/hr/grades', isAuthenticated, (req, res) => {
  hrController.createInsuranceGrade(req, res, { cookies: req.cookies });
});

router.put('/hr/grades/:id', isAuthenticated, (req, res) => {
  hrController.updateInsuranceGrade(req, res, { cookies: req.cookies });
});

router.delete('/hr/grades/:id', isAuthenticated, (req, res) => {
  hrController.deleteInsuranceGrade(req, res, { cookies: req.cookies });
});

module.exports = router;

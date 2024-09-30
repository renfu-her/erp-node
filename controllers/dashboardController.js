// controllers/dashboardController.js
exports.showDashboard = (req, res) => {
    res.render('dashboard', { title: '後台儀表板' });
};

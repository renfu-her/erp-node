// controllers/accountingController.js
exports.showAccountingPage = (req, res) => {
    res.render('accounting', { title: '會計管理' });
};

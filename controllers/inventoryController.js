// controllers/inventoryController.js
exports.showInventoryPage = (req, res) => {
    res.render('inventory', { title: '進銷存管理' });
};

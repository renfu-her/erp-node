const { Employee, Position, Rule } = require('../models');

exports.showHRPage = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [Position, Rule]
    });
    const positions = await Position.findAll();
    const rules = await Rule.findAll();
    res.render('hr', { title: '人事管理', employees, positions, rules });
  } catch (error) {
    res.status(500).send('服務器錯誤');
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const { name, positionId, ruleId, email, salary } = req.body;
    await Employee.create({
      name,
      PositionId: positionId,
      RuleId: ruleId,
      email,
      salary
    });
    res.redirect('/hr');
  } catch (error) {
    res.status(400).send('添加員工失敗');
  }
};

exports.editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, positionId, ruleId, email, salary, status } = req.body;
    await Employee.update({
      name,
      PositionId: positionId,
      RuleId: ruleId,
      email,
      salary,
      status
    }, {
      where: { id }
    });
    res.redirect('/hr');
  } catch (error) {
    res.status(400).send('編輯員工失敗');
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.destroy({
      where: { id }
    });
    res.redirect('/hr');
  } catch (error) {
    res.status(400).send('刪除員工失敗');
  }
};

exports.clockIn = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).send('員工不存在');
    }
    // 這裡你可以添加打卡邏輯，例如創建一個新的 AttendanceRecord
    res.redirect('/hr');
  } catch (error) {
    res.status(400).send('打卡失敗');
  }
};

exports.clockOut = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).send('員工不存在');
    }
    // 這裡你可以添加下班打卡邏輯
    res.redirect('/hr');
  } catch (error) {
    res.status(400).send('下班打卡失敗');
  }
};
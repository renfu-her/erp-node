const { Employee, Position, Rule } = require('../models');
const InsuranceGrade = require('../models/insuranceGradeModel');

exports.showHRPage = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [Position, Rule]
    });
    const positions = await Position.findAll();
    const rules = await Rule.findAll();
    res.render('hr/index', { title: '人事管理', employees, positions, rules });
  } catch (error) {
    res.status(500).send('服務器錯誤');
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const { name, PositionId, RuleId, email, salary } = req.body;
    await Employee.create({
      name,
      PositionId,
      RuleId,
      email,
      salary
    });
    res.redirect('/backend/hr');
  } catch (error) {
    res.status(400).send('添加員工失敗');
  }
};

exports.editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, PositionId, RuleId, email, salary, status } = req.body;
    await Employee.update({
      name,
      PositionId,
      RuleId,
      email,
      salary,
      status
    }, {
      where: { id }
    });
    res.redirect('/backend/hr');
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
    res.redirect('/backend/hr');
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
    res.redirect('/backend/hr');
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
    res.redirect('/backend/hr');
  } catch (error) {
    res.status(400).send('下班打卡失敗');
  }
};

exports.getInsuranceGrades = async (req, res) => {
  try {
    const grades = await InsuranceGrade.findAll({
      order: [['grade', 'ASC'], ['start_date', 'DESC']]
    });
    res.render('hr/grades', { grades, title: '勞保分級表' });
  } catch (error) {
    console.error(error);
    res.status(500).send('服务器错误');
  }
};

exports.createInsuranceGrade = async (req, res) => {
  try {
    const { grade, salary_range, insured_salary, start_date } = req.body;
    await InsuranceGrade.create({ grade, salary_range, insured_salary, start_date });
    res.redirect('/hr/grades');
  } catch (error) {
    console.error(error);
    res.status(500).send('服务器错误');
  }
};

exports.updateInsuranceGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, salary_range, insured_salary, start_date } = req.body;
    await InsuranceGrade.update(
      { grade, salary_range, insured_salary, start_date },
      { where: { id } }
    );
    res.redirect('/hr/grades');
  } catch (error) {
    console.error(error);
    res.status(500).send('服务器错误');
  }
};

exports.deleteInsuranceGrade = async (req, res) => {
  try {
    const { id } = req.params;
    await InsuranceGrade.destroy({ where: { id } });
    res.redirect('/hr/grades');
  } catch (error) {
    console.error(error);
    res.status(500).send('服务器错误');
  }
};
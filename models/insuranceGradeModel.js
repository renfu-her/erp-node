const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InsuranceGrade = sequelize.define('InsuranceGrade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  grade: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  salary_range: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  insured_salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return this.getDataValue('start_date') ? new Date(this.getDataValue('start_date')) : null;
    }
  }
}, {
  tableName: 'insurance_grades',
  timestamps: true
});

module.exports = InsuranceGrade;

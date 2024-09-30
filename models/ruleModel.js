const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rule = sequelize.define('Rule', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Rules'  // 明確指定表名
});

module.exports = Rule;

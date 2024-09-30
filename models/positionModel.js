const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Position = sequelize.define('Position', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Positions'  // 明確指定表名
});

module.exports = Position;

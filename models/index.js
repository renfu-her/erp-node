const Employee = require('./employeeModel');
const Position = require('./positionModel');
const Rule = require('./ruleModel');

Employee.belongsTo(Position, { foreignKey: 'PositionId' });
Position.hasMany(Employee, { foreignKey: 'PositionId' });

Employee.belongsTo(Rule, { foreignKey: 'RuleId' });
Rule.hasMany(Employee, { foreignKey: 'RuleId' });

module.exports = {
  Employee,
  Position,
  Rule
};

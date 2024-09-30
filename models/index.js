const Employee = require('./employeeModel');
const Position = require('./positionModel');
const Rule = require('./ruleModel');

Employee.belongsTo(Position);
Position.hasMany(Employee);

Employee.belongsTo(Rule);
Rule.hasMany(Employee);

module.exports = {
  Employee,
  Position,
  Rule
};

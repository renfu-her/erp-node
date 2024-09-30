const sequelize = require('./config/database');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
  const modelsDir = path.join(__dirname, 'models');
  const modelFiles = fs.readdirSync(modelsDir);

  // 動態導入所有模型
  for (const file of modelFiles) {
    if (file.endsWith('.js') && file !== 'index.js') {
      require(path.join(modelsDir, file));
    }
  }

  // 導入關聯
  require('./models/index');

  try {
    // 檢查數據庫連接
    await sequelize.authenticate();
    console.log('數據庫連接成功。');

    // 獲取所有已定義的模型
    const { Position, Rule, Employee } = sequelize.models;

    // 首先同步 Position 和 Rule 模型
    await Position.sync({ alter: false });
    console.log('Position 模型同步完成。');

    await Rule.sync({ alter: false });
    console.log('Rule 模型同步完成。');

    // 然後同步 Employee 模型
    await Employee.sync({ alter: false });
    console.log('Employee 模型同步完成。');

    console.log('所有模型同步完成。');
  } catch (error) {
    console.error('數據庫同步失敗:', error);
    throw error;  // 重新拋出錯誤，以便在 app.js 中捕獲
  }
};

module.exports = initDb;

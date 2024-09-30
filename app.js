// app.js
const express = require("express");
const initDb = require('./init-db');
const path = require("path");
const engine = require("ejs-mate");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');  // 確保已安裝 jsonwebtoken

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/backend/dashboardRoutes");
const hrRoutes = require("./routes/backend/hrRoutes");
const inventoryRoutes = require("./routes/backend/inventoryRoutes");
const accountingRoutes = require("./routes/backend/accountingRoutes");

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.cookies = req.cookies;
  next();
});

// 新增的全局身份驗證中間件
app.use((req, res, next) => {
  // 排除不需要驗證的路徑
  const excludedPaths = ['/auth/login', '/auth/register', '/auth/logout'];
  if (excludedPaths.includes(req.path)) {
    return next();
  }

  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.clearCookie('token');
    res.clearCookie('user');
    return res.redirect('/auth/login');
  }
});

// 使用 ejs-mate 作為視圖引擎
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 中介軟體設置
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// 路由設置
app.use("/auth", authRoutes);
app.use("/backend", dashboardRoutes);
app.use("/backend", hrRoutes);
app.use("/backend", inventoryRoutes);
app.use("/backend", accountingRoutes);

// 初始化數據庫
initDb().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`伺服器運行於 http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error('伺服器啟動失敗:', err);
  });
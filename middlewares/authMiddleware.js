// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// 中介軟體來檢查是否已驗證
exports.isAuthenticated = (req, res, next) => {
    // 從 cookies 中取得 token
    const token = req.cookies.token;
    
    // 如果 token 存在，驗證它
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // 如果驗證失敗，重定向到登入頁面
                return res.redirect('/auth/login');
            } else {
                // 如果驗證成功，將使用者資訊存入 req.user，並繼續執行下一個中介軟體
                req.user = decoded;  // decoded 內容會包括用戶的資料（如 userId）
                next();
            }
        });
    } else {
        // 如果沒有 token，重定向到登入頁面
        res.redirect('/auth/login');
    }
};

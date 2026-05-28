// 📄 src/core/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

// 🛡️ 第一關：驗證 Token 是否合法（有沒有登入、是不是真的）
const verifyToken = (req, res, next) => {
  // 從 HTTP Headers 提取 Authorization 欄位
  const authHeader = req.headers["authorization"];
  // 預期格式為 "Bearer eyJhbGciOi..."，切開抓後面的 Token 字串
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "拒絕存取：未附帶驗證憑證，請先登入系統！" });
  }

  // 使用點對點密鑰進行簽名校驗
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "憑證無效或已過期，請重新登入！" });
    }
    // 💡 關鍵放行：把解碼出來的 payload (包含 id, center_id, role) 掛在 req.user 上
    req.user = decoded;
    next(); // 通過，前往下一關
  });
};

// 🛡️ 第二關：驗證角色權限是否相符（進階存取控制 RBAC）
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    // 讀取上一關存入的 req.user，比對角色是否精準符合
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        error: `權限不足：此操作僅開放給具備 [${requiredRole}] 權限之帳戶！`,
      });
    }
    next(); // 權限吻合，正式放行進 Controller 執行核心操作！
  };
};

module.exports = { verifyToken, authorizeRole };

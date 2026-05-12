const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("./parent.service");

// 家長註冊
const registerParent = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ error: "請填寫完整資訊 (姓名、信箱、密碼、電話)" });
    }

    // 將密碼加密
    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      created_at: new Date().toISOString(),
    };

    const record = await service.createParentAccount(payload);

    res.json({
      success: true,
      message: "家長帳號註冊成功！",
      data: {
        parent_id: record.parent_id,
        name: record.name,
        email: record.email,
      },
    });
  } catch (err) {
    console.error("❌ 註冊錯誤:", err);
    res.status(500).json({ error: err.message });
  }
};

// 家長登入
const loginParent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "請輸入信箱與密碼" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email 格式不正確" });
    }

    // 3. 確定格式沒問題了，再去資料庫找人
    const parent = await service.getParentByEmail(email);

    if (!parent) {
      return res.status(401).json({ error: "信箱或密碼錯誤" });
    }

    const isMatch = await bcrypt.compare(password, parent.password);

    if (!isMatch) {
      return res.status(401).json({ error: "信箱或密碼錯誤" });
    }

    // 密碼正確，簽發家長專用的 JWT
    // 💡 這裡把 parent_id 包進 Token 裡，之後用來查詢該家長的小孩資料
    const token = jwt.sign(
      {
        parent_id: parent.parent_id,
        role: "parent", // 可以加上 role 方便未來在 Middleware 中區分家長與管理員
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 家長通常希望保持登入久一點，設定 7 天
    );

    res.json({
      success: true,
      message: "登入成功！",
      token: token,
      data: {
        parent_id: parent.parent_id,
        name: parent.name,
      },
    });
  } catch (err) {
    console.error("❌ 登入錯誤:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerParent, loginParent };

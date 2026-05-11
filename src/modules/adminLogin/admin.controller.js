const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("./admin.service");

const registerAdmin = async (req, res) => {
  try {
    // 💡 這裡把 centeraccount_id 拿掉了，前端不需提供
    const { username, email, password } = req.body;

    // 基本驗證
    if (!username || !email || !password) {
      return res.status(400).json({ error: "缺少必要欄位 (帳號、信箱或密碼)" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      username: username,
      email: email,
      password: hashedPassword,
      created_at: new Date().toISOString(),
    };

    const record = await service.createAdminAccount(payload);

    res.json({
      success: true,
      message: "管理員註冊成功！",
      data: record, // 這裡回傳的資料裡面，就會包含 Supabase 幫你自動產生好的 centeraccount_id 囉！
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "請輸入信箱與密碼" });
    }

    // 2. 去資料庫找這個信箱
    const admin = await service.getAdminByEmail(email);

    if (!admin) {
      return res.status(401).json({ error: "信箱或密碼錯誤" });
    }

    // 3. 使用 bcrypt 比對密碼是否正確
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "信箱或密碼錯誤" });
    }

    // 4. 密碼正確！開始製作 JWT 通行證 (Token)
    // 我們把管理員的 ID 還有他所屬的 centeraccount_id 包在 Token 裡面
    // 假設你的 administrator 資料表的主鍵叫做 admin_id
    const token = jwt.sign(
      {
        centeraccount_id: admin.centeraccount_id, // 若你的主鍵叫做 id，請改成 admin.id
        // 即使還沒綁定中心 (null)，也先包進去，後端警衛會根據此值判斷是否能進行機構操作
        center_id: admin.center_id || null,
      },
      process.env.JWT_SECRET, // 拿出 .env 裡的最高機密鑰匙來上鎖
      { expiresIn: "1d" } // 設定這張通行證 1 天後過期
    );

    // 5. 將 Token 回傳給前端
    res.json({
      success: true,
      message: "登入成功！",
      token: token, // 前端會把這串亂碼存起來，以後呼叫 API 都要帶著它
      data: {
        username: admin.username,
        centeraccount_id: admin.centeraccount_id,
        center_id: admin.center_id, // 告訴前端該管理員是否已經擁有管理的中心
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: "Email 格式不正確" });
}
module.exports = { registerAdmin, loginAdmin };

const bcrypt = require("bcrypt");
const service = require("./admin.service");

const registerAdmin = async (req, res) => {
  try {
    const { center_id, username, email, password } = req.body;

    // 基本驗證
    if (!center_id || !username || !email || !password) {
      return res.status(400).json({ error: "缺少必要欄位" });
    }

    // 將密碼進行 bcrypt 加密 (Salt rounds = 10，符合你截圖的 $2b$10$ 格式)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 依照你的需求，在這裡整理要寫入資料庫的預設值
    const payload = {
      center_id: parseInt(center_id),
      username: username,
      email: email,
      password: hashedPassword, // 存入加密後的密碼
      is_verified: true, // 預設 true
      created_at: new Date().toISOString(), // 抓取當下系統時間
    };

    // 呼叫 Service 層處理業務邏輯
    const record = await service.createAdminAccount(payload);

    // 回傳成功訊息與資料
    res.json({
      success: true,
      data: record,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerAdmin };

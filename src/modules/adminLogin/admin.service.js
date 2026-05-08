const model = require("./admin.model");

const createAdminAccount = async (payload) => {
  // 可以在這裡加入檢查 email 是否已存在的邏輯
  return await model.createAdminRecord(payload);
};

module.exports = { createAdminAccount };

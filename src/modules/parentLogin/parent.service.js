const model = require("./parent.model");

const createParentAccount = async (payload) => {
  return await model.createParentRecord(payload);
};

const getParentByEmail = async (email) => {
  return await model.getParentByEmail(email);
};
// 引入更新函數
const updateParentProfile = async (parentId, updateData) => {
  return await model.updateParentProfile(parentId, updateData);
};

module.exports = {
  createParentAccount,
  getParentByEmail,
  updateParentProfile,
};

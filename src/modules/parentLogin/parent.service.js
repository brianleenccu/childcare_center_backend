const model = require("./parent.model");

const createParentAccount = async (payload) => {
  return await model.createParentRecord(payload);
};

const getParentByEmail = async (email) => {
  return await model.getParentByEmail(email);
};

module.exports = { createParentAccount, getParentByEmail };

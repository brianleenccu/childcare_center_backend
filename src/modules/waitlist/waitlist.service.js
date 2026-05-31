const model = require('./waitlist.model');

// 家長加入候補
const joinWaitlist = async (parentId, centerId) => {
  // 防止重複加入
  const existing = await model.findByParentAndCenter(parentId, centerId);
  if (existing) {
    const err = new Error('您已在此機構的候補名單中');
    err.status = 409;
    throw err;
  }
  const record = await model.create(parentId, centerId);
  await model.syncWaitlistCount(centerId);
  return record;
};

// 家長取消候補
const leaveWaitlist = async (waitlistId, parentId) => {
  const deleted = await model.remove(waitlistId, parentId);
  if (!deleted) {
    const err = new Error('找不到此候補記錄，或您無權限取消');
    err.status = 404;
    throw err;
  }
  await model.syncWaitlistCount(deleted.center_id);
  return deleted;
};

// 取得某機構候補名單（管理員用）
const getWaitlistByCenterId = async (centerId) => {
  return await model.findByCenterId(centerId);
};

// 取得某家長的所有候補記錄
const getWaitlistByParentId = async (parentId) => {
  return await model.findByParentId(parentId);
};

// 查詢家長是否已在某機構候補
const checkWaitlistStatus = async (parentId, centerId) => {
  return await model.findByParentAndCenter(parentId, centerId);
};

module.exports = {
  joinWaitlist,
  leaveWaitlist,
  getWaitlistByCenterId,
  getWaitlistByParentId,
  checkWaitlistStatus,
};
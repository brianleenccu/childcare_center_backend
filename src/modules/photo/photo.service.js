const model = require("./photo.model");

const addPhotoRecord = (payload) => {
  return model.createPhotoRecord(payload);
};

const getCenterPhotos = async (center_id) => {
  return await model.getPhotosByCenter(center_id);
};

const updateCaption = async (center_id, photo_id, caption) => {
  return await model.updatePhotoCaption(center_id, photo_id, caption);
};
const deletePhoto = async (center_id, photo_id) => {
  return await model.deletePhotoRecord(center_id, photo_id);
};
// 在 photo.service.js 內新增此函數
const getPhotoCaption = async (center_id, photo_id) => {
  return await model.getPhotoCaption(center_id, photo_id);
};

// 記得在 module.exports 補上匯出
module.exports = {
  addPhotoRecord,
  getCenterPhotos,
  updateCaption,
  deletePhoto,
  getPhotoCaption, // 新增這行
};

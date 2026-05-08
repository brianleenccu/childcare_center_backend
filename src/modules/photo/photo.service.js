const model = require("./photo.model");

const addPhotoRecord = (payload) => {
  return model.createPhotoRecord(payload);
};

const getCenterPhotos = async (center_id) => {
  return await model.getPhotosByCenter(center_id);
};

module.exports = { addPhotoRecord, getCenterPhotos };
